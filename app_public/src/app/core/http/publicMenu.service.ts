import { HttpClient } from "@angular/common/http";
import { Inject, Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Local } from "../models/local.model";
import { API_URL } from "../state/storage";



@Injectable()
export class PublicMenuService {

    constructor(@Inject(API_URL) private apiUrl: string, private http:HttpClient){}

    public getMenu(nameUrl:string):Observable<Local>{
        const url:string = `${this.apiUrl}/menudigital/${nameUrl}`;
        return this.http.get<Local>(url);
    }
}