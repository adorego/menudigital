import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PropiedadTamano } from 'src/app/core/models/propiedad-tamano.model';

@Component({
  selector: 'app-nuevo-tamano',
  templateUrl: './nuevo-tamano.component.html',
  styleUrls: ['./nuevo-tamano.component.scss']
})
export class NuevoTamanoComponent implements OnInit {
  nuevoTamanoFormGroup:FormGroup;
  @Input() tamanoParam:PropiedadTamano;
  @Input() tieneSabores:boolean;
  tituloHeader:string = "Nuevo tamaño";
  tituloAtributosAdicionales:string = "Podés escoger más atributos de este tamaño";
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.nuevoTamanoFormGroup = this.fb.group({
      titulo:[this.tamanoParam.titulo, Validators.required],
      descripcion:[this.tamanoParam.descripcion],
      precio:[this.tamanoParam.precio, Validators.required],
      foto:[this.tamanoParam.foto],
      cantidadDeSabores:["0"],
      cantidadDeComensales:["1"],
      cantidadDePorciones:["1"],
      pesoEnGr:[""]
    });
  }

  public submitTamano(){
    if(this.nuevoTamanoFormGroup.valid){
      console.log("Form to submit:", this.nuevoTamanoFormGroup.value);
    }
  }

  public closeNuevoTamanoEvent(){

  }

  public returnNuevoTamanoPressed(){
    
  }
}
