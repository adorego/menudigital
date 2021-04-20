import { Propiedad } from "./propiedad.model";
import { Topping } from "./topping.model";

export interface PropiedadTamano extends Propiedad{
    _id?:string;
    foto?:File;
    fotoUrl?:string;
    cantidadDeSabores?:number;
    cantidadDeComensales?:number;
    cantidadDePorciones?:number;
    pesoEnGramo?:number;
}