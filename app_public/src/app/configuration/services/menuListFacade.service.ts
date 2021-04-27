import { PropiedadTamano } from './../../core/models/propiedad-tamano.model';
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { empty, Observable, of, throwError } from "rxjs";
import { filter, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { MenuConfigurationService } from "src/app/core/http/menuConfiguracion.service";
import { MenuItem } from "src/app/core/models/menuItem.model";
import { SeccionMenu } from "src/app/core/models/seccion-menu.model";
import { SeccionesStateService } from "src/app/core/state/secciones-state.service";
import { LocalConfigurationFacade } from "./localConfigurationFacade.service";


@Injectable()
export class MenuListFacade{

    constructor(
        private menuConfigurationService: MenuConfigurationService,
        private seccionesStateService:SeccionesStateService, 
        private localConfigurationFacade:LocalConfigurationFacade,
        private toastr: ToastrService)
        {}

    public createSeccion(nuevaSeccionMenu:SeccionMenu):void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    if(local instanceof Array)
                        return this.menuConfigurationService.createSeccion(local[0]._id, nuevaSeccionMenu);
                    else
                    return this.menuConfigurationService.createSeccion(local._id, nuevaSeccionMenu);
                }
            ),
            tap(
                (seccion) => {
                    if(seccion){
                        this.toastr.success('Seccion creada correctamente', 'Mensaje',{
                            closeButton:true
                        });
                        this.seccionesStateService.addSeccion(seccion);
                        
                    }else{
                        this.toastr.error('Error al crear la Sección', 'Mensaje',{
                            closeButton:true
                        });
                    }
                }
            )
        )
        .subscribe(
            (nuevaSeccion) => {
                console.log('Nueva Seccion creada:', nuevaSeccion);
            }
        )
                
        
    
        
        
    }

    public deleteSeccion(toDeleteSeccion:SeccionMenu):void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    return this.menuConfigurationService.deleteSeccion(local[0]._id, toDeleteSeccion._id)
                }
            )
        )
        .subscribe(
            () => {
                this.toastr.success('Sección eliminada correctamente', 'Mensaje',{
                    closeButton:true
                })
                this.updateSeccionState();
            }
        )
    }

    public updateSeccionState():void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) =>{
                    //console.log('Local._id:', local[0]._id);
                    if(local instanceof Array)
                        return this.menuConfigurationService.getSecciones(local[0]._id)
                    else if(local instanceof Object)
                        return this.menuConfigurationService.getSecciones(local._id)
                    else
                        return of([])
                }
            ),
            tap(
                (secciones) =>{
                    //console.log('Secciones:', secciones);
                    this.seccionesStateService.setSecciones(secciones);
                }
            )
        )
        .subscribe(
            //(secciones) => console.log('Subscripcion en updateSeccionState:', secciones)
        )
           
        
    }

    public seccionesState():Observable<SeccionMenu[]>{
        return this.seccionesStateService.secciones$;
    }


    public seccionStateById(seccionIdParam:string):Observable<SeccionMenu>{
        return this.seccionesStateService.secciones$.pipe(
            switchMap(
                (secciones) => {
                    let seccionmenuFound:SeccionMenu;
                    secciones.forEach(
                    (seccion) => {
                        if(seccion._id === seccionIdParam){
                          seccionmenuFound = seccion;
                        }
                          
                    })
                    return of(seccionmenuFound);
            })
        )
    }

    public menuitemStateById(seccionIdParam:string, menuitemId:string){
        console.log('Parametro menuid:', menuitemId);
        return this.seccionesStateService.secciones$.pipe(
            switchMap(
                (secciones) => {
                    let seccionmenuFound:SeccionMenu;
                    let menuitemFound:MenuItem;
                    secciones.forEach(
                    (seccion) => {
                        if(seccion._id === seccionIdParam){
                          seccionmenuFound = seccion;
                          console.log('Seccion encontrada: seccionmenuFound', seccionmenuFound);
                          
                          seccionmenuFound.menuitems.forEach(
                              (item) => {
                                  if(item._id = menuitemId){
                                      menuitemFound = item;
                                  }
                              }
                          )
                          console.log('MenuItem encontrado: menuitemFound', menuitemFound);
                        }
                          
                    })
                    return of(menuitemFound);
            })
        )
    }
    //Gestión de los MenuItems

    public createItemMenu(newItemMenu:MenuItem):Observable<MenuItem>{
        
        return this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    if(local instanceof Array)
                        return this.menuConfigurationService.createItemMenu(local[0]._id, newItemMenu)
                    else
                        return this.menuConfigurationService.createItemMenu(local._id, newItemMenu)
                    
                }
            ),tap(
                (menuItem) => {
                    if(menuItem){
                        this.toastr.success('MenuItem creado correctamente', 'Mensaje',{
                            closeButton:true
                        });
                        this.updateSeccionState();
                    }else{
                        this.toastr.error('Error al crear el MenuItem', 'Mensaje',{
                            closeButton:true
                        });
                    }
                }
            )
            
        )
       

        

    }

    public addTamanoMenuItem(menuitem:MenuItem, tamano:PropiedadTamano):void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    if(local instanceof Array)
                        return this.menuConfigurationService.addTamanoMenuItem(local[0]._id, menuitem, tamano);
                    else
                        return this.menuConfigurationService.addTamanoMenuItem(local[0]._id, menuitem, tamano);
                    
                }
            ),tap(
                (menuItem) => {
                    if(menuItem){
                        this.toastr.success('Tamaño creado correctamente', 'Mensaje',{
                            closeButton:true
                        });
                        this.updateSeccionState();
                    }else{
                        this.toastr.error('Error al crear el Tamaño', 'Mensaje',{
                            closeButton:true
                        });
                    }
                }
            )
            
        ).subscribe(
            (menuitemupdated) => {
                console.log("MenuItem actualizado con tamano:", menuitemupdated);
            }
        )
    }

    public deleteItemMenu(todeleteMenuItem:MenuItem):void{
        console.log('MenuItem a eliminar:', todeleteMenuItem);
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    return this.menuConfigurationService.deleteItemMenu(local[0]._id, todeleteMenuItem)
                }
            )
        )
        .subscribe(
            () => {
                this.toastr.success('MenuItem eliminado correctamente', 'Mensaje',{
                    closeButton:true
                })
                this.updateSeccionState();
            }
        )
    }
    
    public getTamanosFromSeccion(seccion:string):Observable<PropiedadTamano[]>{
        return of([
            {
                nombre:"Mediano",
                tipo:1,
                precio:3000
            },
            {
                nombre:"Grande",
                tipo:1,
                precio:5000
            },
            {
                nombre:"Gigante",
                tipo:1,
                precio:7000
            }
        ]);
    }
    
    
}