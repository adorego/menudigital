import { PropiedadTamano } from './../models/propiedad-tamano.model';
import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Local } from "../models/local.model";
import { MenuItem } from "../models/menuItem.model";
import { SeccionMenu } from "../models/seccion-menu.model";
import { API_URL } from "../state/storage";

@Injectable()
export class MenuConfigurationService {

    constructor(@Inject(API_URL) private apiUrl: string, private http:HttpClient){}

    public getSecciones(localId:string):Observable<SeccionMenu[]>{
        let url:string = `${this.apiUrl}/locales/${localId}/secciones/`;
        console.log('Url a llamar:', url);
        return this.http.get<SeccionMenu[]>(url);
    }
    
    public createSeccion(localId:string,nuevaSeccion:SeccionMenu):Observable<SeccionMenu>{
        if(nuevaSeccion){
            let url:string = `${this.apiUrl}/locales/${localId}/secciones/`;
            //console.log('Url:', url);
            return this.http.post<SeccionMenu>(url, nuevaSeccion);
        }
        return null;
    }

    public deleteSeccion(localId:string, seccionId:string):Observable<{}>{
        
        let url:string = `${this.apiUrl}/locales/${localId}/secciones/${seccionId}`;
        console.log('Url a llamar con delete:', url);
        return this.http.delete(url);
    }

    public createItemMenu(localId:string, menuitem:MenuItem):Observable<MenuItem>{
        const formData = this.loadmenuItemFormData(menuitem);
        if(formData != null){
            let url:string = `${this.apiUrl}/locales/${localId}/secciones/${menuitem.seccion}/menuitems`;
            console.log('Url:', url);
            return this.http.post<MenuItem>(url, formData);
        }
        return null;
    }
    private loadmenuItemFormData(menuitem:MenuItem):FormData{
        if(menuitem && menuitem.seccion && menuitem.seccion){
            let formData:any = new FormData();
            formData.append('nombre',menuitem.nombre);
            formData.append('seccion', menuitem.seccion);
            formData.append('nombreTamano',menuitem.tamanos[0].nombre);
            formData.append('descripcion',menuitem.tamanos[0].descripcion);
            formData.append('precio', menuitem.tamanos[0].precio);
            
            formData.append('foto',menuitem.tamanos[0].foto);
            formData.append('cantidadDeSabores',menuitem.tamanos[0].cantidadDeSabores);
            formData.append('cantidadDeComensales',menuitem.tamanos[0].cantidadDeComensales);
            formData.append('cantidadDePorciones',menuitem.tamanos[0].cantidadDePorciones);
            formData.append('pesoEnGramo',menuitem.tamanos[0].pesoEnGramo);
            return formData;
        }
        return null;
    }

    private loadtamanoFormData(tamano:PropiedadTamano):FormData{
        if(tamano && tamano.nombre && tamano.precio){
            let formData:any = new FormData();
            formData.append('nombreTamano',tamano.nombre);
            formData.append('descripcion',tamano.descripcion);
            formData.append('precio', tamano.precio);
            
            formData.append('foto',tamano.foto);
            formData.append('cantidadDeSabores',tamano.cantidadDeSabores);
            formData.append('cantidadDeComensales',tamano.cantidadDeComensales);
            formData.append('cantidadDePorciones',tamano.cantidadDePorciones);
            formData.append('pesoEnGramo',tamano.pesoEnGramo);
            return formData;
        }
        return null;
    
    }
    public addTamanoMenuItem(localId:string, menuitem:MenuItem, tamano:PropiedadTamano):Observable<MenuItem>{
        const formData = this.loadtamanoFormData(tamano);
        if(formData != null){
            let url:string = `${this.apiUrl}/locales/${localId}/secciones/${menuitem.seccion}/menuitems/${menuitem._id}/tamanos`;
            console.log('Url:', url);
            return this.http.post<MenuItem>(url, formData);
        }
        return null;
    }
    public updateMenuItem(localId:string, menuitem:MenuItem):Observable<MenuItem>{
        console.log('MenuItem recibido:', menuitem);
        const formData = this.loadmenuItemFormData(menuitem);
        if(formData != null){
            console.log(formData.get('nombre')+","+ formData.get('descripcion')+","+formData.get('precio')+","+formData.get('imagen')+","+formData.get('tamano'));
            let url:string = `${this.apiUrl}/locales/${localId}/secciones/${menuitem.seccion}/menuitems`;
            console.log('Url:', url);
            return this.http.put<MenuItem>(url, formData);
        }
        return null;
    }

    public deleteItemMenu(localId:string, menuitem:MenuItem):Observable<{}>{
        console.log('MenuItem a eliminar:', menuitem, " del local:", localId);
        let url:string = `${this.apiUrl}/locales/${localId}/secciones/${menuitem.seccion}/menuitems/${menuitem._id}`;
        console.log('Url a llamar con delete:', url);
        return this.http.delete(url);
    }


    
    public updateLocal(local:Local):Observable<Local>{
        if(local){
            let url:string = `${this.apiUrl}/locales/${local._id}`;
            return this.http.put<Local>(url, local);
        }
        return null;
        
    }

    private errorHandler(error:string){

    }
}