import {Promocion} from '../models/promocion.model';
import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { ConstantPool } from '@angular/compiler';

@Injectable()
export class PromocionesStateService{
    
    private _promociones: BehaviorSubject<Promocion[]> = new BehaviorSubject<Promocion[]>(null);

    public readonly  promociones$:Observable<Promocion[]> = this._promociones.asObservable();

    private _iconoPromociones: BehaviorSubject<String> = new BehaviorSubject<String>(null);

    public readonly iconoPromociones$:Observable<String> = this._iconoPromociones.asObservable();

    constructor(){
        
    }

    public setPromociones(promocionesParam:Promocion[]){
        
        this._promociones.next(promocionesParam);
    }

    public addPromocion(newPromocion:Promocion){
        let promociones:Promocion[]= this._promociones.getValue();
        if(promociones!=null){
            promociones.push(newPromocion);
            this._promociones.next(promociones);
        }else{
            let promocionesArray = new Array<Promocion>();
            promocionesArray.push(newPromocion);
            this._promociones.next(promocionesArray);
        }
        
    }

    public deletePromocion(deletedPromocion:Promocion):void{
        const newPromociones = this._promociones.getValue().filter(value => value._id!==deletedPromocion._id);
        this._promociones.next(newPromociones);
    }

    public setIconoPromociones(iconoPromocionesUrl:String){
        this._iconoPromociones.next(iconoPromocionesUrl);
        console.log('Url de Icono Promociones:', iconoPromocionesUrl);
    }
}