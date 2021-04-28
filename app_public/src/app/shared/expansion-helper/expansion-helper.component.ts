import { PropiedadGuarniciones } from './../../core/models/propiedad-guarniciones.model';
import { PropiedadAgregados } from './../../core/models/propiedad-agregados.model';
import { PropiedadSabor } from './../../core/models/propiedad-sabor.model';
import { PropiedadTamano } from './../../core/models/propiedad-tamano.model';
import { Propiedad } from './../../core/models/propiedad.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-expansion-helper',
  templateUrl: './expansion-helper.component.html',
  styleUrls: ['./expansion-helper.component.scss']
})
export class ExpansionHelperComponent implements OnInit {
  @Input() tipo:number;
  @Input() arrayTamanos:PropiedadTamano[];
  @Input() arraySabores:PropiedadSabor[];
  @Input() arrayAgregados:PropiedadAgregados[];
  @Input() arrayGuarniciones:PropiedadGuarniciones[];
  @Input() titulo:string;
  @Output() selectedObjects = new EventEmitter();
  selectedPropiedades:Array<Propiedad>;
  mensajeSinDatos:string;
  constructor() { }

  ngOnInit(): void {
    this.inicializar_mensajes();
    
  }

  private inicializar_mensajes(){
    switch(this.tipo){
      case(1):
        this.mensajeSinDatos = "No tiene tamaños definidos";
        break;
      case(2):
        this.mensajeSinDatos = "No tiene sabores definidos";
        break;
      case(3):
        this.mensajeSinDatos = "No tiene agregados definidos";
        break;
      case(4):
        this.mensajeSinDatos = "No tiene guarniciones definidas";
        break;
    }
  }

  
    
  public add_propiedad(propiedad:Propiedad){
    
    
  }
}
