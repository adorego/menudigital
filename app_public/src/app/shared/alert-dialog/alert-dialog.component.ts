import { Component, Inject, Input, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { EventEmitter } from 'events';
import { Category } from 'src/app/core/models/category.model';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  
  constructor(@Inject(MAT_DIALOG_DATA) public data:{title_data: string, content_data:string, categoriaParam:Category}) {  }

  ngOnInit(): void {
  }

}
