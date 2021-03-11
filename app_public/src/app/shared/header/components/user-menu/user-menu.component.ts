import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-user-menu',
  templateUrl: './user-menu.component.html',
  styleUrls: ['./user-menu.component.scss']
})
export class UserMenuComponent implements OnInit {

  userName:String='';
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
    
  }

  public signOutEmit(): void {
    this.signOut.emit();
  }
}
