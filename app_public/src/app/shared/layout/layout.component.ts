import { Component, EventEmitter, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Observable, of } from 'rxjs';
import { AuthFacade } from 'src/app/authentication/services/authFacade.service';
import { SidebarLink } from 'src/app/core/models/sidebar.model';
import {BreakpointObserver, Breakpoints} from '@angular/cdk/layout';
import { map, shareReplay, tap } from 'rxjs/operators';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  navList$:Observable<SidebarLink[]>;
  
  @ViewChild("sideNav") sideNav: MatSidenav;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => 
        result.matches),
        tap((result) => {console.log('Matches', result);}),
      shareReplay()
    );
  
  constructor(private authFacade:AuthFacade, private breakpointObserver: BreakpointObserver) { 
    this.navList$ = this.authFacade.getUserSideBarNav();
    
    
  }

  ngOnInit(): void {
  }

  public getUserName():Observable<string>{
    return this.authFacade.getUserState()
      .pipe(
        map(
          (user) =>{
            if(user!=null){
              let userName:string[] = user.name.split(" ", 1);
              return userName[0];
            }else{
              return null;
            }
          }
        )
      )
    
    
    
  }
  public signOut(){
    this.authFacade.logOut();
  }

  toggleSideNav(event){
    event? this.sideNav.open() : this.sideNav.close();
  }


  getDummyNavList():Observable<SidebarLink[]>{
        return of([
          {
            label: 'Reportes',
            icon: 'analytics',
            routeLink: '/dashboard'
          },
          {
            label: 'Mi Local',
            icon: 'build',
            routeLink: '/configuracion/local'
          },
          {
              label: 'Mi Local',
              icon: 'build',
              routeLink: '/configuracion/local'
          },
          {
              label: 'Pedidos',
              icon: 'topic',
              routeLink: '/pedidos'
          }
      ]);
  }
}
