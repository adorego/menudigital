import { OpcionPromocion } from "./opcion-promocion.model";
import { OpcionSabor } from "./opcion-sabor.model";

export interface MenuItem{
    _id?: string;
    seccion:string;
    nombre:string;
    descripcion:string;
    detalle_factura:string; //El concepto que se escribe en la factura
    imagen?:File;
    imagenUrl?:string;
    precio:number;
    promocion?:OpcionPromocion;
    

}