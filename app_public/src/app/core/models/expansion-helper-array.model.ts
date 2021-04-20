import { Propiedad } from "./propiedad.model";

export interface ExpansionArrayModel{
    titulo:string;//Titulo de componente de exapnsion
    arrayPropiedad?:Propiedad[];
    tipo:number;//1 para Tamaño, 2 para Sabor
}