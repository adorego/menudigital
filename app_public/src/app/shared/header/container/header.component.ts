import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from 'src/app/core/models/user.model';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input() userName$: Observable<string>;
  @Output() signOutEvent = new EventEmitter<string>();
  @Output() menuClick: EventEmitter<boolean> = new EventEmitter();
  toggleValue: boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

  public signOut(): void {
    console.log('Sign Out');
    this.signOutEvent.emit('SignOut');
    
  }

  public toggleForMenuClick(){
    this.toggleValue = ! this.toggleValue;
    this.menuClick.emit(this.toggleValue);
    
  }

}
