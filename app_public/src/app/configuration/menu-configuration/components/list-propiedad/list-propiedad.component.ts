import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadTamano } from 'src/app/core/models/propiedad-tamano.model';

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
  
  

  
  constructor() { }

  ngOnInit(): void {
    console.log('Tipo enviado:', this.tipo);
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
