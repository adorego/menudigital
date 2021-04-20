import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { PropiedadTamano } from 'src/app/core/models/propiedad-tamano.model';

@Component({
  selector: 'app-list-propiedad',
  templateUrl: './list-propiedad.component.html',
  styleUrls: ['./list-propiedad.component.scss']
})
export class ListPropiedadComponent implements OnInit {

  @Input() titulo:string;
  @Input() subtitulo:string;
  @Input() tituloNuevaPropiedad:string;
  @Output() nuevaPropiedadEvent = new EventEmitter();
  //Expansion
  @Input() expansionTitulo:string;
  @Input() tipo:number;
  @Input() $arrayTamano:Observable<PropiedadTamano[]>;
  
  

  
  constructor() { }

  ngOnInit(): void {
    console.log('ListPropiedadComponent paramteros:', this.titulo, this.subtitulo);
    
  }

  public closeListPropiedadEvent(){

  }

  public returnListPropiedadPressed(){

  }

  public nuevaPropiedadCall(){
    this.nuevaPropiedadEvent.emit('nuevaPropiedad');

  }

}
