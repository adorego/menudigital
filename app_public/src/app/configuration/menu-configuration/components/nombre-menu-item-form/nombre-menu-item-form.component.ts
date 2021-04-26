import { MenuItem } from 'src/app/core/models/menuItem.model';
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
  thisseccion:SeccionMenu;
  $thisseccion:Observable<SeccionMenu>;
  $thisMenuItem:Observable<MenuItem>;
  thisMenuItem:MenuItem;
  @Output() siguienteEvento = new EventEmitter();
  @Output() onSaveMenuItem = new EventEmitter();
  nombre:FormControl = new FormControl('', Validators.required);
  bebida:FormControl = new FormControl(false, Validators.required);
  menuItemFormGroup:FormGroup;
  questionsSelection:QuestionSelections;
  tituloNombreMenuItem:string;
  subtituloNombreMenuItem:string;

  //Controladores de despliegue de paginas
  currentPage:string;//Pagina actual
  tipoDeWizard:number;
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

  //Paramteros para Pagina de Nuevo Tamaño
  nuevoTamanoTipo:number = 1;
  

  constructor(@Inject(MAT_DIALOG_DATA) private data,private dialogRef:MatDialogRef<NombreMenuItemFormComponent>,
               private fb:FormBuilder, private menulistFacade:MenuListFacade) { }

  ngOnInit(): void {
    this.currentPage = 'nombremenuitem';//Pagina inicial esta misma
    this.thisseccion = this.data.seccion;
    this.$thisseccion = this.menulistFacade.seccionStateById(this.thisseccion._id);
    this.tituloNombreMenuItem = "Nuevo Menú Item";
    this.subtituloNombreMenuItem = "Seccion:" + this.thisseccion.titulo;
    this.menuItemFormGroup = this.fb.group({
      _id: [''],
      seccion: [this.thisseccion, Validators.required],
      nombre: this.nombre
    });
    this.thisMenuItem = {} as MenuItem;
    this.thisMenuItem.tamanos = new Array<PropiedadTamano>();
  }

  
  //Metodo de cierre de Dialogo
  public closeNombreMenuItemEvent(){
    this.dialogRef.close();
  }


  public nuevoTamanoEvent(){
    this.showPage(this.defineNextState('nuevoTamano'));
  }

  //Metodo que actualiza las variables de visibilidad de Pagina
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
          this.showNuevoTamano = false;
          console.log("Lista de Tamaños");
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
            this.currentPage = 'nuevoTamanomenuitem';
            break;

      

    }
      
  }

  public boton_siguiente(){
    this.showPage(this.defineNextState());
  }

  public questionsSelectedCall(questionsSelected:QuestionSelections){
    this.questionsSelection = questionsSelected;
    
    //Caso MenuItem Simple
    if((this.questionsSelection.tamano==0) && (this.questionsSelection.sabores==0) && (this.questionsSelection.agregados==0) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 1;
      console.log("Tipo de NuevoTamano", this.nuevoTamanoTipo);
    }
    //Caso diferentes tamaños solamente
    if((this.questionsSelection.tamano==1) && (this.questionsSelection.sabores==0) && (this.questionsSelection.agregados==0) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 2;
      console.log("Tipo de NuevoTamano", this.nuevoTamanoTipo);
    }
    console.log("El siguiente paso es:", this.defineNextState());
    this.showPage(this.defineNextState());


  }

  
  private defineNextState(action:string=null):string{
    switch (this.currentPage){
      case 'propiedadesmenuitem':
        if(this.tipoDeWizard==1){
          return 'nuevoTamanomenuitem';
        }else if(this.tipoDeWizard==2){
          return 'listatamanosmenuitem';
        }else if(this.tipoDeWizard==3){
          return 'listasaboresmenuitem';
        }else if(this.tipoDeWizard==4){
          return 'listasagregadosmenuitem';
        }else if(this.tipoDeWizard==5){
          return 'listasguarnicionesmenuitem';
        }else{ 
          return 'nombremenuitem';
        }
        
      case 'nombremenuitem':
        if(this.bebida.value){
          return 'bebidaform';
        }else{
          return 'propiedadesmenuitem';
        }  
      
      case 'listatamanosmenuitem':
        if(action && action.localeCompare('nuevoTamano')==0)  
          return 'nuevoTamanomenuitem';  
        else
          return '';
        
      case 'nuevoTamanomenuitem':
        if(this.tipoDeWizard==2){
          return 'listatamanosmenuitem';
        }else
          return '';
        
        
     

      default:
        return 'nombremenuitem';
    }
  }

  //Metodo que llama a la API para crear un tamaño finalmente
  public crearTamano(tamano:PropiedadTamano){
   
    if(!this.thisMenuItem._id){
      this.thisMenuItem.nombre = this.nombre.value;
      this.thisMenuItem.seccion = this.thisseccion._id;
      if(this.thisMenuItem.tamanos)
        this.thisMenuItem.tamanos = new Array<PropiedadTamano>();
      this.thisMenuItem.tamanos.push(tamano);
    
      this.$thisMenuItem = this.menulistFacade.createItemMenu(this.thisMenuItem);
      this.$thisMenuItem.subscribe(
        (menuitem) => {
          this.thisMenuItem = menuitem;
        }
      )
      if(this.tipoDeWizard==1){
        this.closeNombreMenuItemEvent();
      }else{
        this.showPage(this.defineNextState());
      }
    }else{
      this.menulistFacade.addTamanoMenuItem(this.thisMenuItem, tamano);

    }
    

  }

  

  //*Este metodo retorna todos los tamaños utilizados en esta sección
  public getTamanosSeccion():PropiedadTamano[]{
    let listTamanos:PropiedadTamano[] = new Array<PropiedadTamano>();
    this.thisseccion.menuitems.forEach(
      (menuitem) => {
        if(menuitem.tamanos && menuitem.tamanos.length > 0){
          menuitem.tamanos.forEach(
            (tamanoOrigen) => {
              if(!listTamanos.some(
                (tamano) => {
                  tamano._id === tamanoOrigen._id
                }
              )){
                listTamanos.push(tamanoOrigen);
              }
              
            }
          )
        }
      }
    )
    return listTamanos;
  }
}
