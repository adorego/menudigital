import { SeccionMenu } from "./seccion-menu.model";

export interface Local{
    _id?: string;
    nombreDelLocal: string;
    ruc?: string;
    direccionDelLocal: string;
    nombreDelContacto: string;
    celularDelContacto:string;
    emailDelContacto:string;
    secciones:[SeccionMenu];
    urlMenuDigital:string; //Nombre de la Url del Local
    localNameUrl:string; //Nombre en la url de busqueda
    estatus:number;//0 no hay local configurado, 1 el local está configurado pero el Menu no, 3 ambos estan configurados
}