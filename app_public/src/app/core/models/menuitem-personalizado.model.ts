import { DetalleItem } from "./detalle-item.model";

export interface MenuItemPersonalizado{
    _id?:string;
    item_principal?:boolean;
    detalle?:DetalleItem[];
}