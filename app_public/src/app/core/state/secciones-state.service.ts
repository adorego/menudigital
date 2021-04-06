import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SeccionMenu } from "../models/seccion-menu.model";

@Injectable()
export class SeccionesStateService{
    private _secciones: BehaviorSubject<SeccionMenu[]> = new BehaviorSubject<SeccionMenu[]>(null);

    public readonly secciones$:Observable<SeccionMenu[]> = this._secciones.asObservable();

    constructor(){}

    public setSecciones(secciones:SeccionMenu[]){
        console.log('SeccionesState:', secciones);
        this._secciones.next(secciones);
        
    }

    public addSeccion(seccion:SeccionMenu){
        const secciones = this._secciones.getValue();
        secciones.push(seccion);
        this._secciones.next(secciones);
    }

}