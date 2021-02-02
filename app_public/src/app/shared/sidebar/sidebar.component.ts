import { Component, Input, OnInit } from '@angular/core';
import {AuthenticationFacade} from '../../authentication/services/authentication.facade';
import {SidebarLink} from '../../core/models/sidebarlink';
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarLinks: SidebarLink[];

  constructor() { }

  ngOnInit(): void {
    //this.sidebarLinks = this.authFacade.getSidebarLinks();
    //console.log('sidebar.component', this.sidebarLinks);
  }

}
