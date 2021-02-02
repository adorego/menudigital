import { Injectable } from "@angular/core";
import { Router } from '@angular/router';
import {AuthenticationService} from "../../core/authentication/authentication-services";
import {User} from "../../core/models/user.model";
import {SidebarLink} from '../../core/models/sidebarlink';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';
import { UserComponent } from '../../shared/header/components/user/user.component';
import { UserSideBarLinksStateService } from "src/app/core/state/userSideBarLinks-state.service";

@Injectable()
export class AuthenticationFacade{
  
  constructor( private authService:AuthenticationService, private router: Router, private userSideBarLinksState: UserSideBarLinksStateService ){}
  error: string;

  public login(user:User):Observable<boolean>{
        return this.authService.login(user)
                .pipe(
                  map(response => {
                    if(response){
                      this.router.navigateByUrl('dashboard');
                      return (true);
                    }
                  })
                )
        
  }
  
  public register(user:User):Observable<boolean>{
    return this.authService.register(user)
    .pipe(
      map(response => {
        if(response){
          this.router.navigateByUrl('dashboard');
          return (true);
        }
      })
    )
    
  }

  public signOut():void{
    this.authService.logout();
  }

  public getCurrentUser():User{
    return this.authService.getCurrentUser();
  }

  public isLoggedIn(){
    return this.authService.isLoggedIn();
  }
  public getSidebarLinks():SidebarLink[]{
    //return this.getDummyMenu();
    let user:User;
    if(user= this.getCurrentUser()){
      console.log('User.profile:', user.profile);
      switch(user.profile){
        case('user'):{
          //return this.getUserSidebar();
          break;
        }
        case('admin'):{
        //return this.getAdminSidebar();
          break;
        }
        default:{
         // return this.getUserSidebar();
          break;
        }
      }
    }
    else{
      return null;
    }
    
  }

  private getDummyMenu(){
    return[
      {
        label: 'Reportes',
        icon: 'analytics',
        routeLink: '/dashboard'
      },
      {
        label: 'Mi Local',
        icon: 'build',
        routeLink: '/abm/local'
      },
      {
        label: 'Mi Menu Digital',
        icon: 'build',
        routeLink: '/abm/menu'
      },
      {
        label: 'Pedidos',
        icon: 'topic',
        routeLink: '/pedidos'
      }


    ];
  }
  
}