import { MenuItem } from "./menuItem.model";

export interface Category{
    _id?: string;
    icono?: File;
    iconPath?: string;
    iconUrl?:string;
    label: string;
    puesto: number;
    menuItems:MenuItem[];
}