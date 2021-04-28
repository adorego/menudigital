import { CostoAdicionalPropiedad } from "./costo-adicional-propiedad.model";

export interface PropiedadGuarniciones{
    _id:string;
    nombre:string;
    descripcion:string;
    costoAdicional?:CostoAdicionalPropiedad[];
}