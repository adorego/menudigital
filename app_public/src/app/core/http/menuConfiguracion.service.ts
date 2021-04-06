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
        console.log('MenuItem recibido:', menuitem);
        const formData = this.loadmenuItemFormData(menuitem);
        if(formData != null){
            console.log(formData.get('nombre')+","+ formData.get('descripcion')+","+formData.get('precio')+","+formData.get('imagen')+","+formData.get('tamano'));
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
            formData.append('descripcion',menuitem.descripcion);
            formData.append('precio', menuitem.precio);
            formData.append('seccion', menuitem.seccion);
            formData.append('imagen',menuitem.imagen);
           
            return formData;
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
}