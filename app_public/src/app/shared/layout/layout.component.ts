import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {BreakpointObserver, Breakpoints, MediaMatcher} from '@angular/cdk/layout'; 
import { MatSidenav } from '@angular/material/sidenav';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthenticationFacade } from 'src/app/authentication/services/authentication.facade';
import { SidebarLink } from 'src/app/core/models/sidebarlink';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent {
  isShowSidebar: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Input() sideBarLinks:SidebarLink[]; 

  
  

  constructor(private breakpointObserver: BreakpointObserver) { 
    
   
  }

  public ngOnDestroy(): void{
    
  }

}
