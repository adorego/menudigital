import { CostoAdicionalPropiedad } from "./costo-adicional-propiedad.model";

export interface PropiedadAgregados{
    _id?:string;
    nombre:string;
    descripcion:string;
    costoAdicional?:CostoAdicionalPropiedad[];
}