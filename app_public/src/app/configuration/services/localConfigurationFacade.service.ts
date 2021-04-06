import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { ToastrService } from "ngx-toastr";
import {merge, Observable, of } from "rxjs";
import { concatMap, isEmpty, map, mergeMap, switchMap, tap } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/http/authentication.service";
import { LocalConfigurationService } from "src/app/core/http/localConfiguration.service";
import { Local } from "src/app/core/models/local.model";
import { LocalStateService } from "src/app/core/state/local-state.service";

@Injectable()
export class LocalConfigurationFacade{

    baseUrlMenu:string = 'https://menudigital.com/';

    constructor(
        private localconfigurationService:LocalConfigurationService, 
        private authenticationService:AuthenticationService,
        private localState:LocalStateService,
        private router:Router,
        private toastr: ToastrService){}
    
    

    public updateLocalState():Observable<Local>{
        return this.localState.local$
            .pipe(
                switchMap((local) =>{
                    if(local==null && this.authenticationService.getCurrentUser() && this.authenticationService.getCurrentUser()._id){
                        return this.localconfigurationService.getLocalByUserId(this.authenticationService.getCurrentUser()._id);
                    }else{
                        
                        return of(local);
                    }
                })
            )
    }
    public saveLocal(local:Local){
        //console.log('Local recibido:', local);
        let subs:Observable<Local> = null;
        if(local._id){
            //Update
            subs = this.localconfigurationService.updateLocal(local)
            .pipe(
                tap(
                    (local) => {
                        if(local){
                            this.localState.setLocal(local);
                            this.toastr.success('Guardado con exito!', 'Mensaje')
                        }else{
                            this.toastr.error('Error al actualizar el local', 'Mensaje');
                        }
                    }
                )
            )
        }else{
            //New
            subs = this.localconfigurationService.createLocal(local)
            .pipe(
                tap(
                    (local) => {
                        if(local){
                            this.localState.setLocal(local);
                            this.toastr.success('Local guardado con éxito!', 'Mensaje')
                        }else{
                            this.toastr.error('Error al crear el local', 'Mensaje');
                        }
                    }
                )
            )
        }
        //Subscribirse al Observable
        subs.subscribe(
            (local) => {
                console.log('Local guardado/actualizado', local);
                if(local.estatus==1){
                    this.router.navigateByUrl('configuracion/menu');
                }
            }
        )
    }
    
    public getLocalState():Observable<Local>{
        return this.localState.local$;
    }

    public queryUrlMenu(urlmenu:string):Observable<string>{
        let propuestaUrlMenu = urlmenu;
        return this.localconfigurationService.queryUrlMenu(urlmenu)
                .pipe(
                    switchMap(
                        (locales) => {
                            if(!locales || !locales.length){

                                return of(this.baseUrlMenu+propuestaUrlMenu);
                            }else{
                                return of(this.baseUrlMenu+propuestaUrlMenu+'&');
                            }
                        }
                    )
                )
        
        
        
    }
}