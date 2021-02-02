import {Injectable} from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Local } from '../../core/models/local-model';
import { ConfigurationService } from '../../core/configuration/configuration-services';
import { AuthenticationFacade } from 'src/app/authentication/services/authentication.facade';
import { Category } from 'src/app/core/models/category.model';
import { LocalStateService } from 'src/app/core/state/local-state.service';
import { catchError, finalize, map, mergeMap, multicast, switchMap, tap } from 'rxjs/operators';
import { CategoriesStateService } from 'src/app/core/state/categories-state.service';
import {Promocion} from '../../core/models/promocion.model';
import { PromocionesStateService } from 'src/app/core/state/promocion-state.service';
import { SidebarLink } from 'src/app/core/models/sidebarlink';
import { UserSideBarLinksStateService } from 'src/app/core/state/userSideBarLinks-state.service';


@Injectable()
export class ConfigurationFacade{
    
    constructor(private configurationService: ConfigurationService, 
        private authenticationService: AuthenticationFacade, 
        private localStateService:LocalStateService,
        private categoriesStateService:CategoriesStateService,
        private userSideBarLinksState:UserSideBarLinksStateService){}

    //Configuracion del Local
    public addLocal(local:Local):Observable<Local>{
        return this.configurationService.addLocal(local).pipe(
            tap(
                (local)=>{
                    if(Array.isArray(local) && local.length>0)
                        this.localStateService.setCurrentLocal(local);
                }
            )
        )
        
    }

    public getLocalByUserId():Observable<Local>{
        const currentUser = this.authenticationService.getCurrentUser();
        //console.log('Usuario id:', currentUser._id);
            return this.configurationService.getLocalByUserId(currentUser._id).pipe(
                tap(
                    (local)=>{this.localStateService.setCurrentLocal(local);}
                )

            )
        
    }

    public updateByLocalId(local:Local):Observable<Local>{
        return this.configurationService.updateLocalById(local).pipe(
            tap(
                (local)=>{
                    this.localStateService.setCurrentLocal(local);
                }
            ));
    }
    //Configuracion de Categorias

    //Retorna el Observable del Subject del State Management de Categorias (CategoriasStateService)
    public getCategorias():Observable<Category[]>{
        return this.categoriesStateService.categorias$;
    }

    public getCategoriasByLocalId():Observable<Category[]>{
        //console.log('getCategoriasByLocalId');
        return this.configurationService.getCategoriasByLocalId().pipe(
            tap((categorias) => console.log('Categorias devueltas:', categorias))
        )

    }
    //Cargar categorias al State Managemennt
    public loadCategories():void{
        this.configurationService.getCategoriasByLocalId()
           .subscribe(
            (categorias) =>{
                  this.categoriesStateService.setCategories(categorias);
            }
       );
    }
    //Crear una Categoria
    public addCategoria(categoria:Category):Observable<boolean>{
        
        return this.obtenerLocal().pipe(
            mergeMap((local) => this.configurationService.addCategoria(local[0]._id, categoria).pipe(
                tap((addedCategory) => this.categoriesStateService.addCategoria(addedCategory)),
                mergeMap((addedCategory) => of(true)),
                catchError(err => {return throwError(err)})
                )
            ))
        
            
            
        

             
    
        
    }

    private obtenerLocal():Observable<Local>{
        let currentLocal = this.localStateService.getCurrentLocal();
        if(!currentLocal){
            return this.configurationService.getLocalByUserId(this.authenticationService.getCurrentUser()._id)
                
            
            
        }
        else{
            return(of(currentLocal));
        }
    }
    
    //Eliminar una Categoria
    public deleteCategory(categoryToDelete:Category):Observable<boolean>{
        let local = this.obtenerLocal();
        return local.pipe(
            switchMap(
                (local) => {
                    let currentLocal = local[0];
                    console.log('Category to delete in Facade:', categoryToDelete);
                    return this.configurationService.deleteCategory(currentLocal._id, categoryToDelete).pipe(
                        tap(
                            (categorias) => {
                                this.categoriesStateService.setCategories(categorias);
                            }
                        ),
                        switchMap(
                            () => {return of(true);}
                        )
                    )
                }
            ),
            catchError(
                error => {
                    return throwError(error);
                }
            )

        )
        
    }

    public updateCategory(categoryToUpdate:Category):Observable<boolean>{
        let local = this.obtenerLocal();
        return local.pipe(
            switchMap(
                (local) => {
                    let currentLocal = local[0];
                    console.log('Category to update in Facade:', categoryToUpdate);
                    return this.configurationService.updateCategory(currentLocal._id, categoryToUpdate).pipe(
                        tap(
                            (categorias) => {
                                this.categoriesStateService.setCategories(categorias);
                            }
                        ),
                        switchMap(
                            () => {return of(true);}
                        )
                    )
                }
            ),
            catchError(
                error => {
                    return throwError(error);
                }
            )

        )
    }

    public getSidebarLinks():Observable<SidebarLink[]>{
        return this.userSideBarLinksState.userSideBarLinks$;
    }
    
    
    
    
}
