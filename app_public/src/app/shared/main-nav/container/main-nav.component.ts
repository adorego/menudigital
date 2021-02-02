import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SidebarLink } from 'src/app/core/models/sidebarlink';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.scss']
})
export class MainNavComponent {

  isShowSidebar: boolean;
  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
  @Input() sideBarLinks:SidebarLink[]; 
  isMenuOpened:boolean;
  

  constructor(private breakpointObserver: BreakpointObserver) {}

  

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;
    
  }

}
