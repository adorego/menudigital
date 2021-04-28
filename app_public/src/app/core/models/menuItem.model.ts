import { PropiedadSabor } from './propiedad-sabor.model';
import { PropiedadTamano } from './propiedad-tamano.model';

export interface MenuItem{
    _id?: string;
    seccion:string;
    nombre:string;
    tamanos?:PropiedadTamano[];
    sabores?:PropiedadSabor[];
    
    

}