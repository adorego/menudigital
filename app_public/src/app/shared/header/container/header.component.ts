import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../../core/models/user.model';
import {AuthenticationFacade} from '../../../authentication/services/authentication.facade';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() isMenuOpened:boolean;
  @Output() isShowSidebar = new EventEmitter<boolean>();
  public user: User;

  constructor(
    private authFacade: AuthenticationFacade,
    private router: Router

  ) { }

  ngOnInit(): void {
    this.user = this.authFacade.getCurrentUser();
    //console.log('HeaderComponent.user',this.user);
  }

  public openMenu(): void {
    this.isMenuOpened = !this.isMenuOpened;

    this.isShowSidebar.emit(this.isMenuOpened);
  }
  public signOut(): void {
    this.authFacade.signOut();

    this.router.navigate(['login']);
  }
}
