import {Injectable} from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import {SidebarLink} from '../models/sidebarlink';

@Injectable()
export class UserSideBarLinksStateService{
    
    private _userSideBarLinks: BehaviorSubject<SidebarLink[]> = new BehaviorSubject<SidebarLink[]>(null);

    public readonly  userSideBarLinks$:Observable<SidebarLink[]> = this._userSideBarLinks.asObservable();

    constructor(){
        
    }

    public setSidebarLinks(role:string){
        
        this._userSideBarLinks.next(this.getSideBarLinks(role));
    }

    getSideBarLinks(role:string){
       console.log('userSideBarLinksState, role', role); 
       switch(role){
            case('user'):{
                return this.getUserSidebar();
                
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

    private getUserSidebar(){
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
    
      private getAdminSidebar(){
        return[
          {
            label: 'Resportes',
            icon: 'analytics',
            routeLink: '/reportes'
          },
          {
            label: 'Configuración',
            icon: 'build',
            routeLink: '/reportes'
          },
          {
            label: 'Pedidos',
            icon: 'topic',
            routeLink: '/pedidos'
          }
    
    
        ];
      }

}