import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Local } from "../models/local.model";
import { MenuItem } from "../models/menuItem.model";

@Injectable()
export class MenuItemsStateService{
    private _menuItems: BehaviorSubject<MenuItem[]> = new BehaviorSubject<MenuItem[]>(null);

    public readonly menuItems$:Observable<MenuItem[]> = this._menuItems.asObservable();

    constructor(){}

    public setLocal(menuItems:MenuItem[]){
        
        this._menuItems.next(menuItems);
        
    }

}