import { PropiedadTamano } from './../../core/models/propiedad-tamano.model';
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { empty, Observable, of, throwError } from "rxjs";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
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
                        this.toastr.success('Seccion creada correctamente', 'Mensaje');
                        this.seccionesStateService.addSeccion(seccion);
                        
                    }else{
                        this.toastr.error('Error al crear la Sección', 'Mensaje');
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
                this.toastr.success('Sección eliminada correctamente', 'Mensaje')
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
                    console.log('Secciones:', secciones);
                    this.seccionesStateService.setSecciones(secciones);
                }
            )
        )
        .subscribe(
            (secciones) => console.log('Subscripcion en updateSeccionState:', secciones)
        )
           
        
    }

    public seccionesState():Observable<SeccionMenu[]>{
        return this.seccionesStateService.secciones$;
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
                    .pipe(
                        tap(
                            (menuItem) => {
                                if(menuItem){
                                    this.toastr.success('MenuItem creado correctamente', 'Mensaje');
                                    this.updateSeccionState();
                                }else{
                                    this.toastr.error('Error al crear el MenuItem', 'Mensaje');
                                }
                            }
                        )
                    )
                }
            )
            
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
                this.toastr.success('MenuItem eliminado correctamente', 'Mensaje')
                this.updateSeccionState();
            }
        )
    }
    
    public getTamanosFromSeccion(seccion:string):Observable<PropiedadTamano[]>{
        return of([
            {
                titulo:"Mediano",
                tipo:1,
                precio:3000
            },
            {
                titulo:"Grande",
                tipo:1,
                precio:5000
            },
            {
                titulo:"Gigante",
                tipo:1,
                precio:7000
            }
        ]);
    }
    
    
}