import { Topping } from "./topping.model";

export interface PropiedadTamano{
    _id?:string;
    titulo:string;
    descripcion?:string;
    precio:number;
    fotoUrl?:string;
    cantidadDeComensales?:number;
    cantidadDePorciones?:number;
    pesoEnGramo?:number;
}