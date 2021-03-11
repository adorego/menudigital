import { OpcionTamano } from "./opcion-tamano.model";

export interface ConfiguracionCategoria{
    _id:string;
    tieneTamano:boolean;
    tamanos:OpcionTamano[]
}