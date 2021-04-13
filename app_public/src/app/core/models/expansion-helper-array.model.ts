import { PropiedadTamano } from "./propiedad-tamano.model";

export interface ExpansionArrayModel{
    titulo:string;//Titulo de componente de exapnsion
    tipo:number;
    conDatos:boolean;
    arrayTamano?:PropiedadTamano[];
}