import { CostoAdicionalPropiedad } from "./costo-adicional-propiedad.model";

export interface PropiedadSabor{
    _id:string;
    nombre:string;
    descripcion:string;
    costoAdicional?:CostoAdicionalPropiedad[];
}