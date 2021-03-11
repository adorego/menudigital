import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { empty, Observable, of, throwError } from "rxjs";
import { map, mergeMap, switchMap, tap } from "rxjs/operators";
import { MenuConfigurationService } from "src/app/core/http/menuConfiguracion.service";
import { CategoriaMenu } from "src/app/core/models/categoria-menu.model";
import { MenuItem } from "src/app/core/models/menuItem.model";
import { CategoriasStateService } from "src/app/core/state/categorias-state.service";
import { LocalConfigurationFacade } from "./localConfigurationFacade.service";


@Injectable()
export class MenuListFacade{

    constructor(
        private menuConfigurationService: MenuConfigurationService,
        private categoriasStateService:CategoriasStateService, 
        private localConfigurationFacade:LocalConfigurationFacade,
        private toastr: ToastrService)
        {}

    public createCategoria(newCategory:CategoriaMenu):void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    return this.menuConfigurationService.createCategoria(local[0]._id, newCategory);
                }
            ),
            tap(
                (categoria) => {
                    if(categoria){
                        this.toastr.success('Categoria creada correctamente', 'Mensaje');
                        this.updateCategoriasState();
                        
                    }else{
                        this.toastr.error('Error al crear la Categoria', 'Mensaje');
                    }
                }
            )
        )
        .subscribe(
            (nuevaCategoria) => {
                console.log('Nueva Categoria creada:', nuevaCategoria);
            }
        )
                
        
    
        
        
    }

    public deleteCategoria(toDeleteCategory):void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    return this.menuConfigurationService.deleteCategoria(local[0]._id, toDeleteCategory)
                }
            )
        )
        .subscribe(
            () => {
                this.toastr.success('Categoria eliminada correctamente', 'Mensaje')
                this.updateCategoriasState();
            }
        )
    }

    public updateCategoriasState():void{
        this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) =>{
                    console.log('Local._id:', local[0]._id);
                    return this.menuConfigurationService.getCategorias(local[0]._id)
                    .pipe(
                        tap(
                            (categorias) => {
                                this.categoriasStateService.setCategorias(categorias);
                            }
                        )
                    )
                    
                }
            )
        )
        .subscribe(
            (categorias) => console.log('Categorias recibidas:', categorias)
        )
           
        
    }

    public categoriasState():Observable<CategoriaMenu[]>{
        return this.categoriasStateService.categorias$;
    }



    //Gestión de los MenuItems

    public createItemMenu(newItemMenu:MenuItem):Observable<MenuItem>{
        
        return this.localConfigurationFacade.updateLocalState()
        .pipe(
            switchMap(
                (local) => {
                    return this.menuConfigurationService.createItemMenu(local[0]._id, newItemMenu)
                    .pipe(
                        tap(
                            (menuItem) => {
                                if(menuItem){
                                    this.toastr.success('MenuItem creado correctamente', 'Mensaje');
                                    this.updateCategoriasState();
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
                this.updateCategoriasState();
            }
        )
    }
    
    
    
}