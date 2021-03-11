import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-caracteristicas',
  templateUrl: './add-caracteristicas.component.html',
  styleUrls: ['./add-caracteristicas.component.scss']
})
export class AddCaracteristicasComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCaracteristicasComponent>) { }

  ngOnInit(): void {
  }

  onNoClick(){
    this.dialogRef.close();
  }
}
