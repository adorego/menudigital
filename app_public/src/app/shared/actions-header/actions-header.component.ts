import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-actions-header',
  templateUrl: './actions-header.component.html',
  styleUrls: ['./actions-header.component.scss']
})
export class ActionsHeaderComponent implements OnInit {
  @Output() returnEvent = new EventEmitter();
  @Output() closeEvent = new EventEmitter();
  @Input() showReturn:boolean;

  constructor() { }

  ngOnInit(): void {
  }

  public onReturn(){
    this.returnEvent.emit('return');
  }

  public onCloseClick(){
    this.closeEvent.emit('close');
  }

}
