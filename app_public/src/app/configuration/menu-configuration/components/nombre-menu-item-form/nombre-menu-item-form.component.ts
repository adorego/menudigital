import { PropiedadTamano } from './../../../../core/models/propiedad-tamano.model';
import { QuestionSelections } from './../../../../core/models/questions-selection.model';
import { SeccionMenu } from 'src/app/core/models/seccion-menu.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuListFacade } from 'src/app/configuration/services/menuListFacade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-nombre-menu-item-form',
  templateUrl: './nombre-menu-item-form.component.html',
  styleUrls: ['./nombre-menu-item-form.component.scss']
})
export class NombreMenuItemFormComponent implements OnInit {
  seccion:SeccionMenu;
  @Output() siguienteEvento = new EventEmitter();
  @Output() onSaveMenuItem = new EventEmitter();
  nombre:FormControl = new FormControl('', Validators.required);
  menuItemFormGroup:FormGroup;
  questionsSelection:QuestionSelections;
  tituloNombreMenuItem:string;
  subtituloNombreMenuItem:string;

  //Controladores de despliegue de paginas
  currentPage:string;//Pagina actual
  showNombre:boolean = true;
  showPropiedades:boolean = false;
  showListaTamanos:boolean = false;
  showNuevoTamano:boolean = false;
  showListaSabores:boolean = false;
  showListaAgregados = false;
  showListaGuarniciones = false;

  //Parametros Pagina de Propiedades
  tituloListaTamanos:string;
  subtituloListaTamanos:string;
  tituloNuevoTamano:string;
  tituloTamanoExpansionHelper:string;
  

  constructor(@Inject(MAT_DIALOG_DATA) private data,private dialogRef:MatDialogRef<NombreMenuItemFormComponent>,
               private fb:FormBuilder, private menulistFacade:MenuListFacade) { }

  ngOnInit(): void {
    this.currentPage = 'nombremenuitem'
    this.seccion = this.data.seccion;
    this.tituloNombreMenuItem = "Nuevo Menú Item";
    this.subtituloNombreMenuItem = "Seccion:" + this.seccion.titulo;
    this.menuItemFormGroup = this.fb.group({
      _id: [''],
      seccion: [this.seccion, Validators.required],
      nombre: [this.nombre, Validators.required],
      descripcion: [''],
      imagen:[''],
      imagenUrl: [''],
      precio: [''],
      tamanos: this.fb.group({
        _id:[''],
        titulo:[''],
        descripcion:[''],
        precio:[''],
        fotoUrl:[''],
        cantidadDeComensales:[''],
        cantidadDePorciones:[''],
        pesoEnGramo:['']
      })

  
    });
    
  }

  //Metodo que actualiza los parametros de la lista de Tamanos
  private actualizar_listaParametros(){
    //Parametros para Lista de Tamaños
    this.tituloListaTamanos = 'Tamaños de '+this.nombre.value;
    this.subtituloListaTamanos = "Sección: " + this.seccion.titulo;
    this.tituloNuevoTamano = 'Nuevo Tamaño';
    this.tituloTamanoExpansionHelper = 'Puedes reutilizar los tamaños de esta Sección'
  }

  
  public closeNombreMenuItemEvent(){
    this.dialogRef.close();
  }

  public nuevoTamanoEvent(){
    this.showPage(this.defineNextState('nuevoTamano'));
  }

  private showPage(page:string){
    switch (page){
      case 'nombremenuitem':
        this.showNombre = true;
        this.showPropiedades = false;
        this.showListaTamanos = false;
        this.showListaSabores = false;
        this.showListaAgregados = false;
        this.showListaGuarniciones = false;
        this.currentPage = 'nombremenuitem';

        break;

      case 'propiedadesmenuitem':
          this.showNombre = false;
          this.showPropiedades = true;
          this.showListaTamanos = false;
          this.showListaSabores = false;
          this.showListaAgregados = false;
          this.showListaGuarniciones = false;
          this.currentPage = 'propiedadesmenuitem';
          break;
      
      case 'listatamanosmenuitem':
          this.showNombre = false;
          this.showPropiedades = false;
          this.showListaTamanos = true;
          this.showListaSabores = false;
          this.showListaAgregados = false;
          this.showListaGuarniciones = false;
          this.currentPage = 'listatamanosmenuitem';
          break;

      case 'nuevoTamanomenuitem':
            this.showNombre = false;
            this.showPropiedades = false;
            this.showListaTamanos = false;
            this.showListaSabores = false;
            this.showListaAgregados = false;
            this.showListaGuarniciones = false;
            this.showNuevoTamano = true;
            this.currentPage = 'listatamanosmenuitem';
            break;


    }
      
  }

  public boton_siguiente(){
    this.showPage(this.defineNextState());
  }

  public questionsSelectedCall(questionsSelected:QuestionSelections){
    this.questionsSelection = questionsSelected;
    this.actualizar_listaParametros();
    this.showPage(this.defineNextState());


  }

  private defineNextState(action:string=null):string{
    switch (this.currentPage){
      case 'propiedadesmenuitem':
        if(this.questionsSelection.tamano){
          return 'listatamanosmenuitem';
        }else if(this.questionsSelection.sabores){
          return 'listasaboresmenuitem';
        }else if(this.questionsSelection.agregados){
          return 'listasagregadosmenuitem';
        }else if(this.questionsSelection.guarniciones){
          return 'listasguarnicionesmenuitem';
        }else{
          return 'menuitemsimpleform';
        }
      case 'nombremenuitem':
        return 'propiedadesmenuitem';
      case 'listatamanosmenuitem':
        if(action && action.localeCompare('nuevoTamano')==0)  
          return 'nuevoTamanomenuitem';  
        else{
          return 'listatamanosmenuitem';
        }
      default:
        return 'nombremenuitem';
    }
  }

  public getTamanosSeccion():Observable<PropiedadTamano[]>{
    return this.menulistFacade.getTamanosFromSeccion(this.seccion.titulo);
  }
}
