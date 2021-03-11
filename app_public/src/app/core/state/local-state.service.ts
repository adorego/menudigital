import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Local } from "../models/local.model";

@Injectable()
export class LocalStateService{
    private _local: BehaviorSubject<Local> = new BehaviorSubject<Local>(null);

    public readonly local$:Observable<Local> = this._local.asObservable();

    constructor(){}

    public setLocal(localParam:Local){
        console.log('LocalState:', localParam);
        this._local.next(localParam);
        
    }

}