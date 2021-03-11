
export interface OpcionPromocion{
    _id?:string;
    precioActual:number;
    precioAnterior:number;
    descuento:number;
    tipo_promocion?:string; //1:"Permanente", 2:DiasDeLaSemana, 3:PeriodoConFechas
    dias_semana?:[number]; //[0:Domingo, 1:Lunes...]
    fechaInicio?:Date;
    fechaFin?:Date;
}