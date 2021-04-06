import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { SeccionMenu } from 'src/app/core/models/seccion-menu.model';

@Component({
  selector: 'app-form-seccion',
  templateUrl: './form-seccion.component.html',
  styleUrls: ['./form-seccion.component.scss']
})
export class FormSeccionComponent implements OnInit {

  seccionFormGroup:FormGroup;
  @Output() onSaveSeccion = new EventEmitter<SeccionMenu>();
  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<FormSeccionComponent>) { }

  ngOnInit(): void {
    this.seccionFormGroup = this.fb.group({
      titulo:['', Validators.required],
      descripcion:[''],
      puesto:['', Validators.required]
    });
  }

  public crear_seccion(){
    this.onSaveSeccion.emit(this.seccionFormGroup.value);
  }

  public onNoClick(){
    this.dialogRef.close();
  }

}
