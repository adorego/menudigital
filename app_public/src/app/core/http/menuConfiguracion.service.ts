import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CategoriaMenu } from "../models/categoria-menu.model";
import { Local } from "../models/local.model";
import { MenuItem } from "../models/menuItem.model";
import { API_URL } from "../state/storage";

@Injectable()
export class MenuConfigurationService {

    constructor(@Inject(API_URL) private apiUrl: string, private http:HttpClient){}

    public getCategorias(localId:string):Observable<CategoriaMenu[]>{
        let url:string = `${this.apiUrl}/locales/${localId}/categorias/`;
        return this.http.get<CategoriaMenu[]>(url);
    }
    
    public createCategoria(localId:string,categoria:CategoriaMenu):Observable<CategoriaMenu>{
        console.log('CreateCategoria:', localId, categoria);
        if(categoria){
            let url:string = `${this.apiUrl}/locales/${localId}/categorias/`;
            //console.log('Url:', url);
            return this.http.post<CategoriaMenu>(url, categoria);
        }
        return null;
    }

    public deleteCategoria(localId:string, categoria:CategoriaMenu):Observable<{}>{
        console.log('Categoria a eliminar:', categoria, " del local:", localId);
        let url:string = `${this.apiUrl}/locales/${localId}/categorias/${categoria._id}`;
        console.log('Url a llamar con delete:', url);
        return this.http.delete(url);
    }

    public createItemMenu(localId:string, menuitem:MenuItem):Observable<MenuItem>{
        console.log('MenuItem recibido:', menuitem);
        const formData = this.loadmenuItemFormData(menuitem);
        if(formData != null){
            console.log(formData.get('nombre')+","+ formData.get('descripcion')+","+formData.get('precio')+","+formData.get('imagen')+","+formData.get('tamano'));
            let url:string = `${this.apiUrl}/locales/${localId}/categorias/${menuitem.categoria}/menuitems`;
            console.log('Url:', url);
            return this.http.post<MenuItem>(url, formData);
        }
        return null;
    }
    private loadmenuItemFormData(menuitem:MenuItem):FormData{
        if(menuitem && menuitem.categoria && menuitem.categoria){
            let formData:any = new FormData();
            formData.append('nombre',menuitem.nombre);
            formData.append('descripcion',menuitem.descripcion);
            formData.append('precio', menuitem.precio);
            formData.append('categoria', menuitem.categoria);
            formData.append('imagen',menuitem.imagen);
            if(menuitem.tamano!=null && menuitem.tamano!=undefined){
                formData.append('tamano', menuitem.tamano);
            }
            return formData;
        }
        return null;
    }

    public updateMenuItem(localId:string, menuitem:MenuItem):Observable<MenuItem>{
        console.log('MenuItem recibido:', menuitem);
        const formData = this.loadmenuItemFormData(menuitem);
        if(formData != null){
            console.log(formData.get('nombre')+","+ formData.get('descripcion')+","+formData.get('precio')+","+formData.get('imagen')+","+formData.get('tamano'));
            let url:string = `${this.apiUrl}/locales/${localId}/categorias/${menuitem.categoria}/menuitems`;
            console.log('Url:', url);
            return this.http.put<MenuItem>(url, formData);
        }
        return null;
    }

    public deleteItemMenu(localId:string, menuitem:MenuItem):Observable<{}>{
        console.log('MenuItem a eliminar:', menuitem, " del local:", localId);
        let url:string = `${this.apiUrl}/locales/${localId}/categorias/${menuitem.categoria}/menuitems/${menuitem._id}`;
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