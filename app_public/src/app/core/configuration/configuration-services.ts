import {Inject, Injectable} from '@angular/core';
import {Observable, pipe, throwError} from 'rxjs'
import {Local} from '../models/local-model';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../authentication/authentication-services';
import { catchError, switchMap } from 'rxjs/operators';
import {BASE_URL_API} from '../state/base-url-api';
import {map} from 'rxjs/operators';

import { Category } from 'src/app/core/models/category.model';
import { User } from 'src/app/core/models/user.model';
import { DomSanitizer } from '@angular/platform-browser';
import { Promocion } from '../models/promocion.model';
import { of } from 'rxjs';


@Injectable()
export class ConfigurationService {

    constructor(
    @Inject(BASE_URL_API) private api_url:string, 
    private http: HttpClient, 
    private authService: AuthenticationService,
    private sanitizer:DomSanitizer){

    }

    //Configuracion del Local

    public addLocal(local:Local): Observable<Local>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        console.log('Local a enviar:', local);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        console.log('headers:', headers);        
        const url: string = `${this.api_url}/locales`;
        console.log('Url:', url);
        return this.http.post<Local>(url, local, {headers})
                .pipe(
                    catchError( error => {
                        let errMsg;
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
                    map(response => {
                        console.log("Respuesta:"+response);
                        return response;
                    }),

                );

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

    public updateLocalById(local:Local):Observable<Local>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        console.log('headers:', headers);  
        const url: string = `${this.api_url}/locales/${local._id}`;
        return this.http.put<Local>(url, local, {headers} )
                .pipe(catchError(
                    error =>{
                        console.error(error);
                        return throwError(error);
                    }));
    }

    
    //Configuracion de las Categorias
    public addCategoria(localId:string,categoria:Category):Observable<Category>{
        let formData = new FormData();
        formData.append('label',categoria.label);
        formData.append('puesto',categoria.puesto.toString());
        formData.append("icono",categoria.icono);
        console.log("Datos de formData:");
        console.log(formData.get('label')+","+ formData.get('puesto')+","+formData.get('icono'));
        
        const token:string = 'Bearer '+ this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
             //"Content-Type": "multipart/form-data" // 👈
             "Authorization": token
            })
          };
          const url: string = `${this.api_url}/locales/${localId}/categorias`;
          console.log('Url a enviar:', url);
          
          return this.http.post<Category>(url, formData, httpOptions).pipe(
            catchError(
                error =>{
                    console.error('ConfigurationService:', error);
                    return throwError(error);
                }));
          
        
    }

    public deleteCategory(localId:string, categoria:Category):Observable<Category[]>{
        console.log('Category to delete:', categoria);
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        //console.log('headers:', headers);  
        const url: string = `${this.api_url}/locales/${localId}/categorias/${categoria._id}`;
        console.log('Url to delete:', url);
        return this.http.delete<Category[]>(url, {headers} )
                .pipe(
                    catchError(this.handleError()),
                    switchMap(() => {
                        return this.getCategoriasByLocalId();
                    })
                )
    }

    public updateCategory(localId:string, categoria:Category):Observable<Category[]>{
        console.log('Category to update:', categoria);
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        //console.log('headers:', headers);  
        const url: string = `${this.api_url}/locales/${localId}/categorias/${categoria._id}`;
        console.log('Url to update:', url);
        return this.http.put<Category[]>(url, {headers} )
                .pipe(
                    catchError(this.handleError()),
                    switchMap(() => {
                        return this.getCategoriasByLocalId();
                    })
                )
    }

    public getCategoriasByLocalId():Observable<Category[]>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        const user:User = this.authService.getCurrentUser();
        return this.getLocalByUserId(user._id)
                    .pipe(
                        catchError(this.handleError<Local>('ConfigurationService.getLocalByUserId')),
                        map(local =>{
                            if (Array.isArray(local) && local.length>0) {
                                const categorias:Category[]= local[0].categorias;
                                return categorias;
                            }
                        }));
        
        
    }

    public addPromocion(localId:string, promocion:Promocion):Observable<Promocion>{
        console.log('llega asi imagen:', promocion.imagen);
        
        const formData = new FormData();
        formData.append("imagen",promocion.imagen);
        formData.append("descripcion",promocion.descripcion);
        formData.append("precioAnterior",promocion.precioAnterior);
        formData.append("precioActual",promocion.precioActual);
        formData.append("descuento", promocion.descuento);
        if(promocion.nombre)
            formData.append("nombre", promocion.nombre);
        
        //console.log("Datos de formData:imagen", formData.get('imagen'));
        console.log(formData.get('descripcion')+","+ formData.get('precioAnterior')+","+formData.get('precioActual')+","+formData.get('imagen'));
        
        const token:string = 'Bearer '+ this.authService.getToken();
        const httpOptions = {
            headers: new HttpHeaders({
             //"Content-Type": "multipart/form-data",
             "Authorization": token
            })
          };
          const url: string = `${this.api_url}/locales/${localId}/promociones`;
          console.log('Url a enviar:', url);
          
          return this.http.post<Promocion>(url, formData, httpOptions).pipe(
            catchError(
                error =>{
                    console.error('ConfigurationService:', error);
                    return throwError(error);
                }));
    }
    
    public readPromotiones(localId:String):Observable<Promocion[]>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        const url: string = `${this.api_url}/locales/${localId}/promociones`;
          console.log('Url a enviar:', url);
        return this.http.get<Promocion[]>(url, {headers}).pipe(
            catchError(
                error =>{
                    console.error('ConfigurationService:', error);
                    return throwError(error);
                }));

    }

    public eliminarPromocion(localId:string, promocion:Promocion):Observable<Promocion[]>{
        const token:string = 'Bearer '+ this.authService.getToken();
        //console.log('Token:', token);
        const headers= new HttpHeaders()
                .set('content-type', 'application/json')
                .set('Authorization', token);
        //console.log('headers:', headers);  
        const url: string = `${this.api_url}/locales/${localId}/promociones/${promocion._id}`;
        console.log('Url to delete:', url);
        return this.http.delete<Promocion[]>(url, {headers} )
                .pipe(
                    catchError(this.handleError()),
                    switchMap(() => {
                        return this.readPromotiones(localId);
                    })
                )
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