import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-nuevo-sabor',
  templateUrl: './nuevo-sabor.component.html',
  styleUrls: ['./nuevo-sabor.component.scss']
})
export class NuevoSaborComponent implements OnInit {

  nuevoSaborFormGroup:FormGroup;
  @Input() conEncabezado:boolean=true;
  @Input() editable:boolean=true;
  @Input() seccion:string = "";
  @Input() nombre:string = "";
  tituloHeader:string = "Nuevo sabor";
  subtitulo:string = "";


  constructor() { }

  ngOnInit(): void {
  }

  private generar_header(){
      this.tituloHeader = "Datos de:"+ this.nombre;
      this.subtitulo = "Sección:" + this.seccion;
      
  }

  public closeNuevoSaborEvent(){

  }

  public returnNuevoSaborPressed(){
    
  }
}



