import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { PropiedadTamano } from 'src/app/core/models/propiedad-tamano.model';
import { FileUploadComponent } from 'src/app/shared/file-upload/file-upload.component';
import { NombreMenuItemFormComponent } from '../../configuration/menu-configuration/components/nombre-menu-item-form/nombre-menu-item-form.component';

/*
Este componente es el que tiene el formulario de alta de los Menú-Items
Parametros de entrada:
1. sección: Qué sección del MenúDigital es
2. nombre: Nombre de este Item, ingresado en el primer campo del Wizard de Creación de MenúItem
3. tipo: Número que configura que formulario mostrará este componente y qué titulo tendrá
  1. MenúItem simple sin distintos tamaños, ni sabores, ni guarniciones


*/
@Component({
  selector: 'app-nuevo-tamano',
  templateUrl: './nuevo-tamano.component.html',
  styleUrls: ['./nuevo-tamano.component.scss']
})
export class NuevoTamanoComponent implements OnInit {
  @ViewChild(FileUploadComponent) fileupload:FileUploadComponent;
  nuevoTamanoFormGroup:FormGroup;
  @Input() conEncabezado:boolean=true;
  @Input() editable:boolean=true;
  @Input() seccion:string = "";
  @Input() nombre:string = "";
  @Input() tipo:number = 1;
  @Input() tamanoParam:PropiedadTamano;
  @Output() crearTamano = new EventEmitter<PropiedadTamano>();
  tieneSabores:boolean = false;
  tituloHeader:string = "Nuevo tamaño";
  subtitulo:string = "";
  tituloAtributosAdicionales:string = "Podés escoger más atributos de este tamaño";
  constructor(private fb:FormBuilder, private dialogRef:MatDialogRef<NombreMenuItemFormComponent>) { }

  ngOnInit(): void {
    this.tamanoParam==null ? this.initFormGroup(false): this.initFormGroup(true); //Si recibo valores iniciales del Formulario, tomarlos
    this.generar_header();
    this.actualizar_campos();
    this.enfocar_elemento();
  }

  private enfocar_elemento(){
    document.getElementById('nombre_input').focus();
  }

  private actualizar_campos(){
    if(this.tipo == 1){//Casi simple
      this.nuevoTamanoFormGroup.get('nombre').setValue(this.nombre);
    }
  }
  private generar_header(){
    if(this.tipo == 1){//Caso simple
      this.tituloHeader = "Datos de:"+ this.nombre;
      this.subtitulo = "Sección:" + this.seccion;
      this.tituloAtributosAdicionales = "Descripción adicional para tu cliente (*opcional):";
    }
    if(this.tipo == 2){//Caso con diferentes Tamaños
      this.tituloHeader = "Nuevo Tamaño para:"+ this.nombre;
      this.subtitulo = "Sección:" + this.seccion;
      this.tituloAtributosAdicionales = "Descripción adicional para tu cliente (*opcional):";
    }
  }
  private initFormGroup(withParam:boolean){
    if(withParam){
      this.nuevoTamanoFormGroup = this.fb.group({
        nombre:[this.tamanoParam.nombre, Validators.required],
        descripcion:[this.tamanoParam.descripcion],
        precio:[this.tamanoParam.precio, Validators.required],
        foto:[this.tamanoParam.foto],
        cantidadDeSabores:[this.tamanoParam.cantidadDeSabores],
        cantidadDeComensales:[this.tamanoParam.cantidadDeComensales],
        cantidadDePorciones:[this.tamanoParam.cantidadDePorciones],
        pesoEnGr:[this.tamanoParam.pesoEnGramo]
      });
    }else{
      this.nuevoTamanoFormGroup = this.fb.group({
        nombre:["", Validators.required],
        descripcion:[""],
        precio:["", Validators.required],
        foto:[""],
        cantidadDeSabores:["0"],
        cantidadDeComensales:["1"],
        cantidadDePorciones:["1"],
        pesoEnGr:[""]
      });
    }
  }

  public fotoLoaded(foto:File){
    this.nuevoTamanoFormGroup.get('foto').setValue(foto);
    
  }

  public submitTamano(){
    if(this.nuevoTamanoFormGroup.valid){
      console.log("Form to submit:", this.nuevoTamanoFormGroup.value);
      this.crearTamano.emit(this.nuevoTamanoFormGroup.value);
    }
  }

  public closeNuevoTamanoEvent(){
    this.dialogRef.close()
  }

  public returnNuevoTamanoPressed(){
    
  }
}
