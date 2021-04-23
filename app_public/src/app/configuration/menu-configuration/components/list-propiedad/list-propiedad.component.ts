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
  //Expansion
  expansionTitulo:string;
  //Tipo 1: Propiedad de tamaños 
  @Input() tipo:number;
  @Input() $arrayTamano:Observable<PropiedadTamano[]>;
  
  

  
  constructor() { }

  ngOnInit(): void {
    this.crear_heading();
    
  }

  private crear_heading(){
    //NuevoTamanoTipo es 2, de Diferentes tamaños
    if(this.tipo==2){
      this.tituloHeader = this.nombreMenuItem;
      this.subtituloHeader = this.seccion;
      this.tituloInterno = "Tamaños"
    }
  }

  public closeListPropiedadEvent(){

  }

  public returnListPropiedadPressed(){

  }

  public nuevaPropiedadCall(){
    this.nuevaPropiedadEvent.emit('nuevaPropiedad');

  }

}
