import {Injectable, Inject} from '@angular/core';
import {AuthenticationService} from '../authentication/authentication-services';
import {LocalStateService} from '../state/local-state.service';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, mergeMap, multicast, switchMap, tap } from 'rxjs/operators';
import {Local} from '../models/local-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import {BASE_URL_API} from '../state/base-url-api';


@Injectable()
export class LocalService{
    constructor(
        @Inject(BASE_URL_API) private api_url:string,
        private authenticationService:AuthenticationService, 
        private localStateService:LocalStateService,
        private http: HttpClient, 
        private authService: AuthenticationService
        ){}

    public obtenerLocal():Observable<Local>{
        let currentLocal = this.localStateService.getCurrentLocal();
        if(!currentLocal){
            return this.getLocalByUserId(this.authenticationService.getCurrentUser()._id)
                
            
            
        }
        else{
            return(of(currentLocal));
        }
    }

    public getLocalByUserId(userId:string):Observable<Local>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        //console.log('headers:', headers);        
        const url: string = `${this.api_url}/locales/byuser/${userId}`;
        //console.log('Url:', url);
        return this.http.get<Local>(url, {headers})
                    .pipe(
                        catchError(this.handleError<Local>('ConfigurationService.getLocalByUserId')));
    }


    private handleError<T>(operation = 'operation', result?:T) {
        return(error:any): Observable<T> => {
            console.error(error);

            return of(result as T);
            
        };
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