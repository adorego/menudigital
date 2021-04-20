import { PublicMenuFacade } from './../../../../public-menu/services/publicMenuFacade.service';
import { QuestionSelections } from './../../../../core/models/questions-selection.model';
import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-propiedades-menu-item',
  templateUrl: './propiedades-menu-item.component.html',
  styleUrls: ['./propiedades-menu-item.component.scss']
})
export class PropiedadesMenuItemComponent implements OnInit {
  @Input() nombre:string;
  @Input() seccion:string;
  @Output() selectionQuestions = new EventEmitter<QuestionSelections>();
  @Output() returnPropiedadesEvent = new EventEmitter<string>();
  selections:QuestionSelections = {} as QuestionSelections;

  //Tamano question
  tamanoTitulo:string ="Tamaños"
  tamanoQuestion:string;
  tamanoNumber:string = "1";

  //Sabores question
  saboresTitulo:string = "Sabores"
  saboresQuestion:string;
  saboresNumber:string = "2";

  //Agregados question
  agregadosTitulo:string = "Agregados (toppings)"
  agregadosQuestion:string;
  agregadosNumber:string = "3";

  //Guaraniciones question
  guarnicionesTitulo:string = "Guarniciones"
  guarnicionesQuestion:string;
  guarnicionesNumber:string = "4";



  constructor(public dialogRef: MatDialogRef<PropiedadesMenuItemComponent>) { }

  ngOnInit(): void {
    this.tamanoQuestion = "Tiene '"+ this.nombre + "', diferentes tamaños?";
    this.saboresQuestion = "Tiene '" +  this.nombre + "', diferentes sabores?";
    this.agregadosQuestion = "Puede tener '" + this.nombre + "' agregados o toppings opcionales?";
    this.guarnicionesQuestion = "Puede tener '" + this.nombre + "' guarniciones?";
  }


  public onReturn(){

  }

  public tamanoSelection(tamanoSelection:boolean){
    //console.log('Seleccion de tamano:', tamanoSelection);
    this.selections.tamano = tamanoSelection;
    //tamanoSelection == true ? this.selections.tamano=true : this.selections.tamano=false;
    
  }

  public saboresSelection(saboresSelection:boolean){
    this.selections.sabores = saboresSelection;
  }

  public agregadosSelection(agregadosSelection:boolean){
    this.selections.agregados = agregadosSelection;
  }

  public guarnicionesSelection(guarnicionesSelection:boolean){
    this.selections.guarniciones = guarnicionesSelection;
  }
  

  public closePropiedadesEvent(){
    this.dialogRef.close();
  }

  public returnPropiedadesEventPressed(){
    this.returnPropiedadesEvent.emit('return');
  }

  public boton_siguiente(){
    this.selectionQuestions.emit(this.selections);
  }
}
