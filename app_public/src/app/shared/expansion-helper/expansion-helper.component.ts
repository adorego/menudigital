import { PropiedadTamano } from './../../core/models/propiedad-tamano.model';
import { Propiedad } from './../../core/models/propiedad.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-expansion-helper',
  templateUrl: './expansion-helper.component.html',
  styleUrls: ['./expansion-helper.component.scss']
})
export class ExpansionHelperComponent implements OnInit {
  @Input() tipo:number;
  @Input() $arrayTamanos:Observable<PropiedadTamano[]>;
  arrayTamanos:PropiedadTamano[];
  @Input() titulo:string;
  @Output() selectedObjects = new EventEmitter();
  selectedPropiedades:Array<Propiedad>;
  constructor() { }

  ngOnInit(): void {
    this.$arrayTamanos.subscribe(
      (tamanos) => {
        this.arrayTamanos = tamanos;
      }
    )
    
  }

  
    
  public add_propiedad(propiedad:Propiedad){
    
    
  }
}
