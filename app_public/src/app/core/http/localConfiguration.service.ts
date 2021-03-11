import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Local } from "../models/local.model";
import { API_URL } from "../state/storage";

@Injectable()
export class LocalConfigurationService {

    constructor(@Inject(API_URL) private apiUrl: string, private http:HttpClient){}

    public getLocalByUserId(userId:string):Observable<Local>{
        let url:string = `${this.apiUrl}/locales/byuser/${userId}`;
        return this.http.get<Local>(url);
            

    }    

    public queryUrlMenu(propuestaUrl:string):Observable<Local[]>{
        let url:string = `${this.apiUrl}/locales/byurlmenu/${propuestaUrl}`;
        return this.http.get<Local[]>(url);
    }

    public createLocal(local:Local):Observable<Local>{
        if(local){
            let url:string = `${this.apiUrl}/locales`;
            return this.http.post<Local>(url, local);
        }
        return null;
    }

    public updateLocal(local:Local):Observable<Local>{
        //console.log('Local recibido:', local);
        if(local){
            let url:string = `${this.apiUrl}/locales/${local._id}`;
            return this.http.put<Local>(url, local);
        }
        return null;
        
    }
}