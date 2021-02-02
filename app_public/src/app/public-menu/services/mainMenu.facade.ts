import {Injectable} from '@angular/core';
import { Observable, of } from 'rxjs';
import { Category } from 'src/app/core/models/category.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { SidebarLink } from 'src/app/core/models/sidebarlink';

@Injectable()
export class MainMenuFacade{

    constructor(){}

    public getMenuDigitalSideBar():Observable<SidebarLink[]>{
        return of(this.dummyGetSideBarlinks());
       //return null;
    }

    /*
    public getMenuDigital():Observable<MenuItem[]>{
        return of(this.getDummyMenuDigital());
    }*/

    public getMenuDigital2():Observable<Category[]>{
        return of(this.getMenuDigital_category());
    }
    //Solo para prueba
    private dummyGetSideBarlinks():SidebarLink[]{

        const sideBarLinks:SidebarLink[]=[
        {
            label:'Promociones',
            icon:'',
            routeLink:''
        },
        
            {
            label:'Pizza',
            icon:'',
            routeLink:''
        },{
            label:'Empanadas',
            icon:'',
            routeLink:''
        }];
        return sideBarLinks;
    }

    private getMenuDigital_category():Category[]{
        const menuList: Category[] = [{
            _id: '987666676',
            iconUrl:'http://localhost:3000/promotion-icon.png',
            label: 'Promociones',
            puesto: 1,
            menuItems:[
                {
                    id: '0909090909',
                    nombre:'Promo 2x1 Borde relleno',
                    descripcion:'Riquisima pizza con borde relleno de tamaño familiar',
                    imagenUrl:'http://localhost:3000/eefd608a089d7b014270822c90163a17',
                    tipo:1,
                    precioActual: 55000,
                    precioAnterior: 65000,
                    descuento: 0.3,
                    caracteristicas:[
                        {
                            _id:'98878788',
                            iconName:'group',
                            texto:'6',
                            tooltip:'Cantidad de personas que pueden comer'
                        },
                        {
                            _id:'98878788',
                            iconName:'local_pizza',
                            texto:'24',
                            tooltip:'Cantidad de porciones'
                        },
                        {
                            _id:'98878788',
                            iconName:'outdoor_grill',
                            texto:'Masa normal',
                            tooltip:'Tipo de masa de la pizza'
                        }
                    ]
                },
                {
                    id: '0909090907',
                    nombre:'Napo 2x1',
                    descripcion:'Compras una Napo y te llevas 1 mas de regalo',
                    imagenUrl:'http://localhost:3000/cd887f043faddca4417b1e21eff35718',
                    tipo:1,
                    precioActual: 45000,
                    precioAnterior: 75000,
                    descuento: 0.3,
                    caracteristicas:[
                        {
                            _id:'98878788',
                            iconName:'groups',
                            texto:'3',
                            tooltip:'Cantidad de personas que pueden comer'
                        },
                        {
                            _id:'98878788',
                            iconName:'local_pizza',
                            texto:'24',
                            tooltip:'Cantidad de porciones'
                        },
                        {
                            _id:'98878788',
                            iconName:'outdoor_grill',
                            texto:'Masa normal',
                            tooltip:'Tipo de masa de la pizza'
                        }
                    ]
                }
            ]},
            {
                _id: '987666676',
                iconUrl:'http://localhost:3000/pizza-icon.png',
                label: 'Pizzas',
                puesto: 2,
                menuItems:[
                {
                    nombre:'Pizza Pepperoni',
                    descripcion:'Riquisima pizza sabor pepperoni con una importante cantidad de pepperonis como nunca lo viste',
                    tipo:2,
                    imagenUrl:'http://localhost:3000/pizzas/pepperoni_6porciones.jpg',
                    precioActual: 45000,
                    tamanos:
                    [
                            {
                                id:'787655666',
                                titulo:'Tamaño mediano',
                                pedazos:6,
                                imagenUrl:'http://localhost:3000/pizzas/pepperoni_6porciones.jpg',
                                precio:45000,
                                
                            },
                            {
                                id:'787655666',
                                titulo:'Tamaño grande',
                                pedazos:8,
                                imagenUrl:'http://localhost:3000/pizzas/pepperoni_8porciones.jpg',
                                precio:65000
                            },
                            {
                                id:'787655666',
                                titulo:'Tamaño familiar',
                                pedazos:12,
                                imagenUrl:'http://localhost:3000/pizzas/pepperoni_12porciones.jpg',
                                precio:85000
                            }
                        ],
                        caracteristicas:[
                            {
                                _id:'98878788',
                                iconName:'local_pizza',
                                texto:'6',
                                tooltip:'Cantidad de personas que pueden comer'
                            },
                                {
                                _id:'98878788',
                                iconName:'local_pizza',
                                texto:'24',
                                tooltip:'Cantidad de porciones de pizza'
                            },
                            {
                                _id:'98878788',
                                iconName:'local_pizza',
                                texto:'Masa normal',
                                tooltip:'Tipo de masa de la pizza'
                            }
                        ],
                        tituloDePersonalizacion:'Podes personalizar tu pizza',
                        opcionesDePersonalizacion:[
                            {
                                _id:'98878788',
                                titulo:'Tamaño',
                                iconName:'',
                                opciones:[
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Mediano',
                                        tooltip:'6 pedazos'
                                    },
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Grande',
                                        tooltip:'8 porciones'
                                    },
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Familiar',
                                        tooltip:'12 pedazos'
                                    }

                                ]
                            },
                            {
                                _id:'98878789',
                                titulo:'Masa de la Pizza',
                                iconName:'',
                                opciones:[
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Masa gruesa',
                                        tooltip:'Es una masa echa con harina...'
                                    },
                                    {
                                        _id:'987878789',
                                        iconName:'',
                                        texto:'Masa fina',
                                        tooltip:'Es una masa crokante...'
                                    },
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Borde relleno',
                                        tooltip:'Deliciosa masa con bordes llenos de queso katupiri'
                                    }

                                ]
                            },
                            {
                                _id:'98878789',
                                titulo:'Sabores disponibles',
                                iconName:'',
                                opciones:[
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Catupiri con pollo',
                                        tooltip:'Delicioso borde relleno de queso katupiri.'
                                    },
                                    {
                                        _id:'987878789',
                                        iconName:'',
                                        texto:'Pepperoni',
                                        tooltip:'Este sabor esta hecho con trozos de pepperoni, salsa de tomate'
                                    },
                                    {
                                        _id:'987878787',
                                        iconName:'',
                                        texto:'Calabreza',
                                        tooltip:'Este sabor está hecho con delicisiosos trozos de calabreza..'
                                    }

                                ]
                            }

                            ],
                        }]
                }];

        return menuList;
    }
    /*
    private getDummyMenuDigital():MenuItem[]{
        const menuList: MenuItem[]=[
            {
                id: '0909090909',
                categoria:{
                    _id: '987666676',
                    iconUrl:'http://localhost:3000/promotion-icon.png',
                    label: 'Promociones',
                    puesto: 1
                },
                nombre:'Promo 2x1 Borde relleno',
                descripcion:'Riquisima pizza con borde relleno de tamaño familiar',
                imagenUrl:'http://localhost:3000/eefd608a089d7b014270822c90163a17',
                tipo:1
            },
            {
                id: '0909090909',
                categoria:{
                    _id: '987666676',
                    iconUrl:'http://localhost:3000/promotion-icon.png',
                    label: 'Promociones',
                    puesto: 1
                },
                nombre:'Napo 2x1',
                descripcion:'Compras una Napo y te llevas 1 mas de regalo',
                imagenUrl:'http://localhost:3000/cd887f043faddca4417b1e21eff35718',
                tipo:1
            },
            {
                id: '0909090909',
                categoria:{
                    _id: '987666676',
                    iconUrl:'http://localhost:3000/pizza-icon.png',
                    label: 'Pizzas',
                    puesto: 2
                },
                nombre:'Pizza Pepperoni',
                descripcion:'Riquisima pizza sabor pepperoni con una importante cantidad de pepperonis como nunca lo viste',
                tipo:2,
                tamanos:[
                    {
                        id:'787655666',
                        titulo:'Tamaño mediano',
                        pedazos:6,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_6porciones.jpg',
                        precio:45000
                    },
                    {
                        id:'787655666',
                        titulo:'Tamaño grande',
                        pedazos:8,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_8porciones.jpg',
                        precio:65000
                    },
                    {
                        id:'787655666',
                        titulo:'Tamaño familiar',
                        pedazos:12,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_12porciones.jpg',
                        precio:85000
                    }
                ]
            },
            {
                id: '0909090909',
                categoria:{
                    _id: '987666676',
                    iconUrl:'http://localhost:3000/pizza-icon.png',
                    label: 'Pizzas',
                    puesto: 2
                },
                nombre:'Pizza Napolitana',
                descripcion:'Riquisima pizza sabor napolitana con tomates y jamón cocido',
                tipo:2,
                tamanos:[
                    {
                        id:'787655666',
                        titulo:'Tamaño mediano',
                        pedazos:6,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_6porciones.jpg',
                        precio:45000
                    },
                    {
                        id:'787655666',
                        titulo:'Tamaño grande',
                        pedazos:8,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_8porciones.jpg',
                        precio:65000
                    },
                    {
                        id:'787655666',
                        titulo:'Tamaño familiar',
                        pedazos:12,
                        imagenUrl:'http://localhost:3000/pizzas/pepperoni_12porciones.jpg',
                        precio:85000
                    }
                ]
            }
        ]
        return menuList;
    }
    */
}