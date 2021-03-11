import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { MenuItem } from "../models/menuItem.model";
import {Carrito} from '../models/carrito.model';

@Injectable()
export class CategoriasStateService{
    private _carrito: BehaviorSubject<Carrito> = new BehaviorSubject<Carrito>(null);

    public readonly carrito$:Observable<Carrito> = this._carrito.asObservable();

    constructor(){}

    public addMenuItem(){
        
    }

}