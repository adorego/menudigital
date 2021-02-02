import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EventEmitter } from 'events';
import { OpcionTamano } from 'src/app/core/models/opcionTamano.model';

@Component({
  selector: 'app-pizza-config',
  templateUrl: './pizza-config.component.html',
  styleUrls: ['./pizza-config.component.css']
})
export class PizzaConfigComponent implements OnInit {

  @Output() onSubmit = EventEmitter();

  //Tamaños disponibles
  tamanosDataSource:OpcionTamano[] = [
    {id:"1", titulo:"Mediana", pedazos: 6, }
  ];

  formGroupMenuItem: FormGroup;
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

    //Inicialización de FormGroup de un MenuItem
    this.formGroupMenuItem = this.fb.group({
      nombre:[''],
      descripcion:[''],
      sabor:['', Validators.required],
      nuevoSabor:[{value:'', disabled:true}],
      cantidadTamanos:['1', Validators.required],
      tamanos: this.fb.array([]),
      });
    //Carga de los sabores predefinidos
    //this.sabores = ["Catupiri con Pollo", "Napolitana", "Pepperoni"];
  }

}
