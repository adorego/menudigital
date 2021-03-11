import { CategoriaMenu } from "./categoria-menu.model";

export interface Local{
    _id?: string;
    nombreDelLocal: string;
    ruc?: string;
    direccionDelLocal: string;
    nombreDelContacto: string;
    celularDelContacto:string;
    emailDelContacto:string;
    categorias:[CategoriaMenu];
    urlMenuDigital:string; //Nombre de la Url del Local
    localNameUrl:string; //Nombre en la url de busqueda
}