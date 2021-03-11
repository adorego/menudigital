import { ConfiguracionCategoria } from "./configuracion-categoria.model";
import { MenuItem } from "./menuItem.model";

export interface CategoriaMenu{
    _id:string;
    titulo:string;
    descripcion?:string;
    puesto:number;
    menuitems?:MenuItem[];
}
