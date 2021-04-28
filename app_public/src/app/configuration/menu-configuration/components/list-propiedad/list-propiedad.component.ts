import { PropiedadSabor } from './../../../../core/models/propiedad-sabor.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PropiedadTamano } from 'src/app/core/models/propiedad-tamano.model';
import { PropiedadAgregados } from 'src/app/core/models/propiedad-agregados.model';
import { PropiedadGuarniciones } from 'src/app/core/models/propiedad-guarniciones.model';

@Component({
  selector: 'app-list-propiedad',
  templateUrl: './list-propiedad.component.html',
  styleUrls: ['./list-propiedad.component.scss']
})
export class ListPropiedadComponent implements OnInit {
  tituloHeader:string;
  subtituloHeader:string;
  tituloInterno:string;
  @Input() nombreMenuItem:string;
  @Input() seccion:string;
  tituloNuevaPropiedad:string;
  @Output() nuevaPropiedadEvent = new EventEmitter();
  @Output() botonSiguienteEvent = new EventEmitter();
  //Expansion 
  expansionTitulo:string;
  //Tipo 1: Propiedad de tamaño, 2: Propiedad de sabor
  @Input() tipo:number;
  @Input() arrayTamano:PropiedadTamano[];
  @Input() arraySabores:PropiedadSabor[];
  @Input() arrayAgregados:PropiedadAgregados[];
  @Input() arrayGuarniciones:PropiedadGuarniciones[];
  
  

  
  constructor() { }

  ngOnInit(): void {
    this.crear_heading();
    
  }

  private crear_heading(){
    //NuevoTamanoTipo es 2, de Diferentes tamaños
    if(this.tipo==1){
      this.tituloHeader = "Tamaños de:" + this.nombreMenuItem;
      this.subtituloHeader = "Sección:" + this.seccion;
      this.tituloNuevaPropiedad = "Nuevo Tamaño";
      this.expansionTitulo = "Tamaños definidos para:"+ this.nombreMenuItem;
    }
    if(this.tipo==2){
      this.tituloHeader = "Sabores de:" + this.nombreMenuItem;
      this.subtituloHeader = "Sección:" + this.seccion;
      this.tituloNuevaPropiedad = "Nuevo Sabor";
      this.expansionTitulo = "Sabores definidos para:"+ this.nombreMenuItem;

    }
    if(this.tipo==3){
      this.tituloHeader = "Agregados de:" + this.nombreMenuItem;
      this.subtituloHeader = "Sección:" + this.seccion;
      this.tituloNuevaPropiedad = "Nuevo Agredo(Topping)";
      this.expansionTitulo = "Agregados definidos para:"+ this.nombreMenuItem;

    }
    if(this.tipo==4){
      this.tituloHeader = "Guarniciones de:" + this.nombreMenuItem;
      this.subtituloHeader = "Sección:" + this.seccion;
      this.tituloNuevaPropiedad = "Nuevo Guarnición";
      this.expansionTitulo = "Guarniciones definidas para:"+ this.nombreMenuItem;

    }
  }

  public closeListPropiedadEvent(){

  }

  public returnListPropiedadPressed(){

  }

  public nuevaPropiedadCall(){
    this.nuevaPropiedadEvent.emit('nuevaPropiedad');

  }

  public boton_siguiente(){
    this.botonSiguienteEvent.emit("siguiente");
  }

}
