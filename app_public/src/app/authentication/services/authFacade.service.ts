import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { switchMap, tap } from "rxjs/operators";
import { LocalConfigurationFacade } from "src/app/configuration/services/localConfigurationFacade.service";
import { AuthenticationService } from "src/app/core/http/authentication.service";
import { SidebarLink } from "src/app/core/models/sidebar.model";
import { User } from "src/app/core/models/user.model";
import { UserStateService } from "src/app/core/state/user-state.service";

@Injectable()
export class AuthFacade{
    localSubscription:Subscription;
    constructor(
        private authService:AuthenticationService, 
        private userStateService: UserStateService, 
        private router:Router,
        private localConfigurationFacade:LocalConfigurationFacade){}

    public login(user:User):void{
         this.localSubscription = this.authService.login(user).pipe(
            tap((user) =>{
                this.userStateService.setUser(user);
                
                
            }),
            switchMap(
                (user)=>{
                    return this.localConfigurationFacade.updateLocalState();
                }
            )
          ).subscribe(
              (local) => {
                  if(local instanceof Array && local.length==0){
                      console.log('Entro en Array sin datos:', local);
                      this.router.navigateByUrl('configuracion/local');
                  }else if(local instanceof Array && local.length > 0 ){
                    console.log('Entro en Array:', local[0]);
                    this.router.navigateByUrl(this.next_path(local[0].estatus));
                    this.unsubscribeLocal();  
                   }else{
                    console.log('Entró en objeto:', local);
                    this.router.navigateByUrl(this.next_path(local.estatus));
                    this.unsubscribeLocal();
                   }
              }
          )
          
    }

    private unsubscribeLocal(){
        this.localSubscription.unsubscribe();
    }
    private next_path(estatus:number){
        if(estatus==0){
            return ('configuracion/local');
            
        }else if(estatus==1){
            return ('configuracion/menu');
            
        }else if(estatus==2){
            return('dashboard');
        }
        return 'login'
    }

    public register(user:User):void{
        this.authService.register(user).pipe(
            tap((user) =>{
                this.userStateService.setUser(user);
                
                
            }),
            switchMap(
                (user)=>{
                    return this.localConfigurationFacade.updateLocalState();
                }
            )
          ).subscribe(
            (local) => {
                this.router.navigateByUrl(this.next_path(local.estatus));
              
            }
          )

    }
    public getUserState():Observable<User>{
        return this.userStateService.user$;
    }

    public getUserSideBarNav():Observable<SidebarLink[]>{
        
        return this.userStateService.sidenavLinks$;
    }
    public logOut(){
        this.authService.logout();
        this.router.navigateByUrl('login');
    }
}