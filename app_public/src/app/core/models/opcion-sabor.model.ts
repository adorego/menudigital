import { CostoAdicionalSabor } from "./costo-adicional-sabor.model";

export interface OpcionSabor{
    _id:string;
    nombre:string;
    descripcion:string;
    costoAdicional?:CostoAdicionalSabor[];
}