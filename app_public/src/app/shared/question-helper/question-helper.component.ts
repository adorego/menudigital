import { MatRadioChange } from '@angular/material/radio';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-question-helper',
  templateUrl: './question-helper.component.html',
  styleUrls: ['./question-helper.component.scss']
})
export class QuestionHelperComponent implements OnInit {
  @Input() number;
  @Input() titulo:string;
  @Input() question:string;
  @Output() selectEvent = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  public selectOption(option:MatRadioChange){
    this.selectEvent.emit(option.value);
  }
}
