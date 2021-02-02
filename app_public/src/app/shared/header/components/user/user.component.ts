import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


import {User} from '../../../../core/models/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @Input() user: User;
  @Output() signOut: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  public signOutEmit(): void {
    this.signOut.emit();
  }

  ngOnInit(): void {
  }

}
