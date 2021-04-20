import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-nueva-propiedad',
  templateUrl: './nueva-propiedad.component.html',
  styleUrls: ['./nueva-propiedad.component.scss']
})
export class NuevaPropiedadComponent implements OnInit {
  @Input() tituloNuevaPropiedad:string;
  @Output() nuevaPropiedadEvent = new EventEmitter<string>();
  constructor() { }

  ngOnInit(): void {
  }

  public nuevaPropiedadCall(){
    this.nuevaPropiedadEvent.emit('nuevapropiedad');
  }
}
