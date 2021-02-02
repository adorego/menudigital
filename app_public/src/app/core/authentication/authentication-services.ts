import {Inject, Injectable} from '@angular/core';
import { User } from '../models/user.model';
import {AuthResponse} from '../models/authresponse.model';
import {BROWSER_STORAGE} from '../state/storage';
import {DataService} from './data-service';
import { merge, Observable, of, throwError} from 'rxjs';
import {map, mergeMap, tap} from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { UserSideBarLinksStateService } from '../state/userSideBarLinks-state.service';
@Injectable()
export class AuthenticationService {
    tokenName:string= 'menuDigital-token';
    
    constructor(
        @Inject(BROWSER_STORAGE) private storage: Storage,
        private dataService: DataService,
        private userSideBarLinksState:UserSideBarLinksStateService
    ){}

    public login(user:User): Observable<boolean> {
        return this.dataService.login(user)
                .pipe(
                    catchError( error => {
                        let errMsg:string;
                        if(error.error instanceof ErrorEvent){
                            errMsg = 'Client side error:', error.error.message;
                            console.error(errMsg);
                            errMsg = 'Ocurrió un error durante la authenticación'
                        }else{
                            errMsg = `Error en el servidor:`+ this.getServerErrorMessage(error);
                            console.error(errMsg);
                            errMsg = 'Ocurrió un error durante la authenticación'
                        }
                        return throwError(
                            errMsg
                        )
                    }),
                    tap(response => {
                            this.saveToken(response.token);
                            this.updateProfile(response.token);
                        }),
                    mergeMap((response => of(true))

                    )
                    
                )
    }
    public register(user:User): Observable<boolean>{
        return this.dataService.register(user)
        .pipe(
            catchError( error => {
                let errMsg;
                if(error.error instanceof ErrorEvent){
                    errMsg = 'Client side error:', error.error.message;
                    console.error(errMsg);
                    errMsg = 'Ocurrió un error durante el registro'
                }else{
                    errMsg = `Error en el servidor:`+ this.getServerErrorMessage(error);
                    console.error(errMsg);
                    errMsg = 'Ocurrió un error durante el registro'
                }
                return throwError(
                    errMsg
                )
            }),
            tap(response => {
                    this.saveToken(response.token);
                    this.updateProfile(response.token);

                }),
            mergeMap((response => of(true))

            )
            
        )
    }
    public logout(): void{
        this.storage.removeItem(this.tokenName);
    }
    public getToken(): string {
        return this.storage.getItem(this.tokenName);
    }
    
    public saveToken(token:string){
        this.storage.setItem(this.tokenName, token);
    }
    public isLoggedIn(): boolean{
        const token: string = this.getToken();
        if(token){
            //Se usa atob para decidificar el token
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp > (Date.now()/1000);
        }else {
            return false;
        }
    }

    public getCurrentUser(): User{
        if(this.isLoggedIn()){
            const token: string = this.getToken();
            const {_id, email, name, profile} = JSON.parse(atob(token.split('.')[1]));
            return {_id, email, name, profile} as User;
        }
    }

    private updateProfile(token:string){
        const profile = JSON.parse(atob(token.split('.')[1]));
        console.log('updateProfile.profile',profile);
        this.userSideBarLinksState.setSidebarLinks(profile.role);

    }
    private errorHandler(error: HttpErrorResponse){
        if(error.error instanceof ErrorEvent){
            console.error('Client side error:', error.error.message);
        }else{
            console.error(`Backen returned error`+ this.getServerErrorMessage(error));
        }
        return throwError(
            'Ocurrio un error en la Authenticación'
        )
    }

    private getServerErrorMessage(error: HttpErrorResponse): string {
        switch (error.status) {
            case 404: {
                return `No encontrado: ${error.message}`;
            }
            case 403: {
                return `Acceso Denegado: ${error.message}`;
            }
            case 401: {
                return `Error en la authenticación: ${error.message}`;
            }
            
            case 500: {
                return `Error interno: ${error.message}`;
            }

            default: {
                return `Error desconocido del servidor: ${error.message}`;
            }

        }
    }
}