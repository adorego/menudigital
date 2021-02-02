import { Component, Input, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-personalizar-menu-item',
  templateUrl: './personalizar-menu-item.component.html',
  styleUrls: ['./personalizar-menu-item.component.css']
})
export class PersonalizarMenuItemComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<PersonalizarMenuItemComponent>) { }

  
  ngOnInit(): void {
  }

  //Cerrar dialogo de Nuevo MenuItem
  onNoClick(){
    this.dialogRef.close();
  }

}
