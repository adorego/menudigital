import {Injectable} from '@angular/core';
import {ConfigurationService} from '../../core/configuration/configuration-services';
import { LocalService } from '../../core/configuration/local-services';
import {PromocionesStateService} from '../../core/state/promocion-state.service';
import { Promocion } from '../../core/models/promocion.model';
import { Observable, of, throwError } from 'rxjs';
import { catchError, finalize, map, mergeMap, multicast, switchMap, tap } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/core/authentication/authentication-services';
import { AuthenticationFacade } from 'src/app/authentication/services/authentication.facade';
import { UserSideBarLinksStateService } from 'src/app/core/state/userSideBarLinks-state.service';
import { SidebarLink } from 'src/app/core/models/sidebarlink';


@Injectable()
export class MenuItemFacade{
    
    constructor(private configurationService: ConfigurationService,
                private localService:LocalService,
                private promocionesStateService:PromocionesStateService,
                private authenticationFacade: AuthenticationFacade,
                private userSideBarLinksState: UserSideBarLinksStateService
                ){}

    //Crear una promo
    public createPromo(promocion:Promocion):Observable<boolean>{
        return this.localService.obtenerLocal().pipe(
                mergeMap((local) => this.configurationService.addPromocion(local[0]._id, promocion).pipe(
                tap((addedPromocion) => this.promocionesStateService.addPromocion(addedPromocion)),
                mergeMap((addedPromocion) => of(true)),
                catchError(err => {return throwError(err)})
                )
            ))
    }

    //Devuelve el Observable de Estado de Promociones (abstraccion)
    public getPromotionState():Observable<Promocion[]>{
        return this.promocionesStateService.promociones$;
    }

    //Devuelve el Observable de Estado del icono de Promociones
    public getIconoPromocionesState():Observable<String>{
        return this.promocionesStateService.iconoPromociones$;
    }

    //Carga las promociones vigentes
    public loadMenuitemsPromociones():Observable<boolean>{
        
        return this.localService.obtenerLocal().pipe(
            mergeMap((local) => this.configurationService.readPromotiones(local[0]._id).pipe(
                tap((promociones) => this.promocionesStateService.setPromociones(promociones)),
                tap((promociones) => this.promocionesStateService.setIconoPromociones(promociones[0].promocionIconUrl)),
                mergeMap((promociones) => of(true)),
                catchError(err => {return throwError(err)})
            ))
        )
    }
    
    public eliminarPromocion(promocion:Promocion):Observable<boolean>{
        return this.localService.obtenerLocal().pipe(
            mergeMap((local) => this.configurationService.eliminarPromocion(local[0]._id, promocion)),
            tap((promociones) => this.promocionesStateService.setPromociones(promociones)),
            mergeMap((promociones) => of(true)),
            catchError(err => {return throwError(err)})
        )

    }

    public getSideBarLinks():Observable<SidebarLink[]>{
        return this.userSideBarLinksState.userSideBarLinks$;
    }
}