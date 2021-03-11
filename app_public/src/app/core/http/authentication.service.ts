import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable, of } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { AuthResponse } from "../models/authresponse.model";
import { User } from "../models/user.model";
import { BROWSER_STORAGE } from "../state/storage";

@Injectable()
export class AuthenticationService {
    private apiBaseUrl = 'http://localhost:3000/api';
    private tokenName: string = "menuDigital-token";

    constructor(@Inject(BROWSER_STORAGE) private storage: Storage,
        private http:HttpClient){}
    
    public login(user:User): Observable<User>{
        const url: string = `${this.apiBaseUrl}/login`;
        return this.http.post<AuthResponse>(url, user)
                .pipe(
                    tap( (response) => {
                        this.storage.setItem(this.tokenName, response.token);
                    }),
                    switchMap((result) => {
                        if(result.token){
                            const token: string = result.token;
                            const loggedUser:User = JSON.parse(atob(token.split('.')[1]));
                            return of(loggedUser);
                        }
                        else{
                            return null;
                        }
                        
                    })
                )
    }
    public getToken(): string {
        return this.storage.getItem(this.tokenName);
    }
    

    public isLoggedIn(): boolean{
        const token: string = this.getToken();
        if(token){
            //Se usa atob para decodificar el token
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
        }else{
            return null;
        }
    }

    public register(user:User): Observable<User>{
        const url: string = `${this.apiBaseUrl}/register`;
        return this.http.post<AuthResponse>(url, user)
                .pipe(
                    tap( (response) => {
                        this.storage.setItem(this.tokenName, response.token);
                    }),
                    switchMap((result) => {
                        if(result.token){
                            const token: string = result.token;
                            const loggedUser:User = JSON.parse(atob(token.split('.')[1]));
                            return of(loggedUser);
                        }
                        else{
                            return null;
                        }
                        
                    })
                )
    }
    public logout(){
        this.storage.removeItem(this.tokenName);
    }
}