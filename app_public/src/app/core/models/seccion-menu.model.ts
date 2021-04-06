import { MenuItem } from "./menuItem.model";

export interface SeccionMenu{
    _id?:string;
    titulo:string;
    descripcion:string;
    puesto:number;
    menuitems?:MenuItem[];
}