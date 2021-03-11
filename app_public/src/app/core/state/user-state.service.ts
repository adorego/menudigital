import { state } from "@angular/animations";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { SidebarLink } from "../models/sidebar.model";
import { User } from "../models/user.model";

@Injectable()
export class UserStateService{
    private _user: BehaviorSubject<User> = new BehaviorSubject<User>(null);

    public readonly user$:Observable<User> = this._user.asObservable();

    private _sidenavLinks: BehaviorSubject<SidebarLink[]> = new BehaviorSubject<SidebarLink[]>(null);

    public readonly sidenavLinks$:Observable<SidebarLink[]> = this._sidenavLinks.asObservable();

    constructor(){}

    public setUser(userParam:User){
        
        this._user.next(userParam);
        if(userParam.role){
            this.setUserNavLinksByProfile(userParam.role);
            
        }
    }

    public setUserNavLinksByProfile(profile:string):void{
        switch(profile){
            case('user'):
                this._sidenavLinks.next(this.getUserNavLinks());
                break;
            default:
                this._sidenavLinks.next(this.getUserNavLinks());
                break;

        }

    }

    private getUserNavLinks():SidebarLink[]
    {
        
        return[
            {
              label: 'Reportes',
              icon: 'analytics',
              routeLink: '/dashboard'
            },
            {
              label: 'Mi Local',
              icon: 'restaurant',
              routeLink: '/configuracion/local'
            },
            {
              label: 'Mi Menu Digital',
              icon: 'menu_book',
              routeLink: '/configuracion/menu'
            },
            {
              label: 'Pedidos',
              icon: 'topic',
              routeLink: '/pedidos'
            }
      
      
          ];
    }
    
}