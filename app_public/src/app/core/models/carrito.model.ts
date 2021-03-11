import {MenuItem} from './menuItem.model';

export enum estatus_carrito {
    cargando = 1,
    confirmado, //Cuando el cliente confirma la compra
    entregado  
}



export interface Carrito{
    _id:string;
    menuitems: MenuItem[];
    estatus:estatus_carrito;

}