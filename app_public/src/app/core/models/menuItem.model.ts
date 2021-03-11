import { OpcionTamano } from "./opcion-tamano.model";
import { OpcionPromocion } from "./opcion-promocion.model";
import { OpcionSabor } from "./opcion-sabor.model";

export interface MenuItem{
    _id?: string;
    categoria:string;
    nombre:string;
    descripcion:string;
    imagen?:File;
    imagenUrl?:string;
    tipo:number;//1. Con tamaños, 2. Sin tamaños
    tamano?:string;
    precio:number;
    promocion?:OpcionPromocion;
    tamanos?:OpcionTamano[];
    sabores?:OpcionSabor[];
    

}