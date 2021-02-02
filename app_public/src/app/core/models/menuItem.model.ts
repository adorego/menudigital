import {Category} from './category.model';
import {OpcionTamano} from './opcionTamano.model';
import {CaracteristicasMenuItem} from './caracteristicasMenuItem.model';
import {OpcionPersonalizacion} from './opcionPersonalizacion';

export interface MenuItem{
    id?: string;
    categoria?:Category;
    nombre:string;
    descripcion:string;
    tamanos?:OpcionTamano[];
    imagenUrl:string;
    tipo:number;
    precioActual:number;
    precioAnterior?:number;
    descuento?:number;
    caracteristicas:CaracteristicasMenuItem[];//Son las caracteristicas de este menuItem que deben mostrarse
    tituloDePersonalizacion?:string; //Titulo de la sección de personalización
    opcionesDePersonalizacion?:OpcionPersonalizacion[];

}