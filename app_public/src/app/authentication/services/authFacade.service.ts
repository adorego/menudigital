import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Observable } from "rxjs";
import { tap } from "rxjs/operators";
import { AuthenticationService } from "src/app/core/http/authentication.service";
import { SidebarLink } from "src/app/core/models/sidebar.model";
import { User } from "src/app/core/models/user.model";
import { UserStateService } from "src/app/core/state/user-state.service";

@Injectable()
export class AuthFacade{
    constructor(private authService:AuthenticationService, private userStateService: UserStateService, private router: Router){}

    public login(user:User):void{
        this.authService.login(user).pipe(
            tap((user) =>{
                this.userStateService.setUser(user);
                
                
            })
          ).subscribe(
              (user) => {
                this.router.navigateByUrl('configuracion');
              }
          )
    }

    public register(user:User):void{
        this.authService.register(user).pipe(
            tap((user) =>{
                this.userStateService.setUser(user);
                
                
            })
          ).subscribe(
              (user) => {
                this.router.navigateByUrl('configuracion');
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