import {CaracteristicasMenuItem} from './caracteristicasMenuItem.model';
export interface OpcionPersonalizacion{
    _id: string;
    titulo: string;
    iconName: string;
    opciones:CaracteristicasMenuItem[];
}