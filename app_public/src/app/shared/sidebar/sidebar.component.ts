import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { SidebarLink } from 'src/app/core/models/sidebar.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  @Input() sidebarLinks$: Observable<SidebarLink[]>;
  //@Input() sidebarLinks: SidebarLink[];

  constructor() { }

  ngOnInit(): void {
  }

}
