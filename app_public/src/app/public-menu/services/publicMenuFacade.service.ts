import { Injectable } from "@angular/core";
import { from, of } from "rxjs";
import { Observable} from "rxjs";
import { tap } from "rxjs/operators";
import { PublicMenuService } from "src/app/core/http/publicMenu.service";
import { Local } from "src/app/core/models/local.model";
import { SeccionesStateService } from "src/app/core/state/secciones-state.service";
import { LocalStateService } from "src/app/core/state/local-state.service";
import { SeccionMenu } from "src/app/core/models/seccion-menu.model";



@Injectable()
export class PublicMenuFacade{
    constructor(
        private menuConfigurationService: PublicMenuService,
        private seccionesStateService:SeccionesStateService,
        private localStateService:LocalStateService){}

    public getMenuDigital(nameUrl:string):void{
        this.menuConfigurationService.getMenu(nameUrl)
        .pipe(
           tap((local) =>{
               if(local){
                    console.log('Local devuelto:', local, 'Secciones:', local.secciones);
                    this.localStateService.setLocal(local);
                    this.seccionesStateService.setSecciones(local.secciones);
               }
                
           }) 
        )
        .subscribe(
            (local) => console.log('Local devuelto:', local)
        )
    }

    public getSeccionesState():Observable<SeccionMenu[]>{
        return this.seccionesStateService.secciones$;
    }

    public getLocalState():Observable<Local>{
        return this.localStateService.local$;
    }

    /*
    public getSeccionesPrueba():void{
    
        this.seccionesStateService.setSecciones(
            [
                {
                    _id:"76676",
                    titulo:"Promociones",
                    descripcion:"Descuentos temporales",
                    puesto:1,
                    menuitems:[
                        {
                            _id: "8989898",
                            seccion:"76676",
                            nombre:"2x1 Familiar",
                            descripcion:"2 Pizzas familiares por 1",
                            detalle_factura:"2 Pizzas tamaño familiar",
                            imagenUrl:"",
                            precio:78000,
                            tipo:2,
                            promocion:{
                                _id:"878789",
                                precioActual:78000,
                                precioAnterior:97000,
                                descuento:0.2
                            }
                        },
                        {
                            _id: "8989898",
                            seccion:"76676",
                            nombre:"2x1 Calzones",
                            descripcion:"2 Calzones de los sabores que desee",
                            detalle_factura:"2 Calzones",
                            imagenUrl:"",
                            precio:68000,
                            tipo:2,
                            promocion:{
                                _id:"878791",
                                precioActual:68000,
                                precioAnterior:99000,
                                descuento:0.25
                            }
                        }
                    ]
                },
                {
                    _id:"76677",
                    titulo:"Pizzas",
                    descripcion:"",
                    puesto:2,
                    menuitems:[
                        {
                            _id: "8989898",
                            seccion:"76677",
                            nombre:"Pepperoni",
                            descripcion:"Riquisima masa hecha de harina, con salsa de tomate y sabrosos pepperonis",
                            detalle_factura:"Pizza",
                            precio:78000,
                            tipo:1,
                            tamanos:[
                                {
                                    _id:"8989898",
                                    tamano:"Grande",
                                    imagenUrl:"",
                                    pedazos:8,
                                    comensales:3,
                                    cantsabores:2,
                                    precio:78000,
                                    predeterminado:true,
                                    toppings:[
                                        {
                                            _id:"5656565",
                                            nombre:"Borde relleno",
                                            descripcion:"Exquisito borde de queso catupiri",
                                            precio: 5000

                                        },
                                        {
                                            _id:"5656567",
                                            nombre:"Extra Queso",
                                            descripcion:"300 gs de queso extra en tu Pizza",
                                            precio: 5000
                                        }

                                    ]
                                },
                                {
                                    _id:"8989865",
                                    tamano:"Familiar",
                                    imagenUrl:"",
                                    pedazos:12,
                                    comensales:4,
                                    cantsabores:3,
                                    precio:88000,
                                    predeterminado:false,
                                    toppings:[
                                        {
                                            _id:"5656565",
                                            nombre:"Borde relleno",
                                            descripcion:"Exquisito borde de queso catupiri",
                                            precio: 6000

                                        },
                                        {
                                            _id:"5656567",
                                            nombre:"Extra Queso",
                                            descripcion:"400 gramos adicionales de queso extra en tu Pizza",
                                            precio: 6000
                                        }

                                    ]
                                },
                                {
                                    _id:"8989843",
                                    tamano:"Gigante",
                                    imagenUrl:"",
                                    pedazos:16,
                                    comensales:4,
                                    cantsabores:3,
                                    precio:98000,
                                    predeterminado:false,
                                    toppings:[
                                        {
                                            _id:"5656565",
                                            nombre:"Borde relleno",
                                            descripcion:"Exquisito borde de queso catupiri",
                                            precio: 6000

                                        },
                                        {
                                            _id:"5656567",
                                            nombre:"Extra Queso",
                                            descripcion:"500 gs de queso extra en tu Pizza",
                                            precio: 7000
                                        }

                                    ]
                                }
                            ],
                            sabores:[
                                {
                                    _id:"6767676",
                                    nombre:"Pepperoni",
                                    descripcion:"Riquisima masa con salsa de tomate exclusiva y pepperoni",
                                    costoAdicional:[
                                        {
                                            _id:"7676767",
                                            tamano: "8989898",
                                            cantsabores:2,
                                            costo_adicional: 3000,
                                            operacion:1
                                        },
                                        {
                                            _id:"7676767",
                                            tamano: "8989898",
                                            cantsabores:1,
                                            costo_adicional: 6000,
                                            operacion:1
                                        },
                                        {
                                            _id:"7676767",
                                            tamano: "8989865",
                                            cantsabores:3,
                                            costo_adicional: 4000,
                                            operacion:1
                                        }
                                    ]
                                },
                                {
                                    _id:"09097878",
                                    nombre:"Española",
                                    descripcion:"Riquisima masa con salsa de tomate exclusiva y pepperoni",
                                    costoAdicional:[
                                        {
                                            _id:"7676767",
                                            tamano: "8989898",
                                            cantsabores:2,
                                            costo_adicional: 6000,
                                            operacion:1
                                        },
                                        {
                                            _id:"7676767",
                                            tamano: "8989898",
                                            cantsabores:1,
                                            costo_adicional: 8000,
                                            operacion:1
                                        },
                                        {
                                            _id:"7676767",
                                            tamano: "8989865",
                                            cantsabores:3,
                                            costo_adicional: 6000,
                                            operacion:1
                                        }
                                    ]
                                },
                                {
                                    _id:"09097878",
                                    nombre:"Napolitana",
                                    descripcion:"Riquisima masa con salsa de tomate exclusiva y pepperoni"
                                }
                            ]
                            
                            
                        }
                    ]
                },
                {
                    _id:"76678",
                    titulo:"Calzones",
                    descripcion:"",
                    puesto:3,
                    menuitems:[
                        {
                            _id: "8989898",
                            seccion:"76678",
                            nombre:"Napolitano",
                            descripcion:"Riquisima masa hecha de harina, con salsa de tomate y sabrosos pepperonis",
                            detalle_factura:"Calzone sabor napolitano",
                            precio:78000,
                            tipo:2
                        }
                    ]
                }
            ]
        )
    
    
    
    
    
    
    }
    */
}