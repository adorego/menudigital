import { PropiedadTamano } from './propiedad-tamano.model';
import { OpcionPromocion } from "./opcion-promocion.model";

export interface MenuItem{
    _id?: string;
    seccion:string;
    nombre:string;
    tamanos?:PropiedadTamano[];
    

}