import { Subscription } from 'rxjs';
import { PropiedadTamano } from './../../../../core/models/propiedad-tamano.model';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { Observable, of } from 'rxjs';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { ExpansionArrayModel } from 'src/app/core/models/expansion-helper-array.model';
import { MatRadioChange } from '@angular/material/radio';

@Component({
  selector: 'app-form-menu-item',
  templateUrl: './form-menu-item.component.html',
  styleUrls: ['./form-menu-item.component.scss']
})
export class FormMenuItemComponent implements OnInit {

  showTamanoOptions:boolean = false;
  nuevoTamano:boolean = false;
  tamanos_seccion:PropiedadTamano[] = new Array<PropiedadTamano>(0);
  $tamanos_seccion:Observable<PropiedadTamano[]>;
  subTamanoSeccion:Subscription;
  botonSiguiente:boolean = false;
  tituloTamano:string="Puedes reutilizar los tamaños de esta sección";
  
  constructor(@Inject(MAT_DIALOG_DATA) public data, private dialogRef:MatDialogRef<FormMenuItemComponent>) { }

  @Output() onSaveMenuItem = new EventEmitter<MenuItem>();

  ngOnInit(): void {
    //this.$tamanos_seccion = this.dataDePruebaTamanosSeccion();
    this.subTamanoSeccion = this.$tamanos_seccion.subscribe(
      (tamanos) => {
        this.tamanos_seccion = tamanos;
      }
    )
    
  }

  public crear_menuItem(){
    
  }
  

  public onNoClick(){
    this.dialogRef.close();
  }

  public changeShowTamanos(event:MatRadioChange){
    if(event.value.localeCompare('1')==0){
      this.showTamanoOptions=true;
    }else{
      this.showTamanoOptions=false;
      this.botonSiguiente = true;
    }
  }

  public agregar_tamano(){
    this.tamanos_seccion.push()
  }
  public nuevo_tamano(){
    this.nuevoTamano = !this.nuevoTamano;
  }
  /*
  public dataDePruebaTamanosSeccion():Observable<PropiedadTamano[]>{
    return(
      of(
        [{
          titulo:"Mediano",
          precio:0
        },
        {
          titulo:"Grande",
          precio:0
        },
        {
          titulo:"Gigante",
          precio:0
        }]
      )
    
    );

  }
  */
}
