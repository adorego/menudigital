import { MenuItem } from 'src/app/core/models/menuItem.model';
import { PropiedadTamano } from './../../../../core/models/propiedad-tamano.model';
import { QuestionSelections } from './../../../../core/models/questions-selection.model';
import { SeccionMenu } from 'src/app/core/models/seccion-menu.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, EventEmitter, Inject, Input, OnInit, Output, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MenuListFacade } from 'src/app/configuration/services/menuListFacade.service';
import { Observable, Subscription } from 'rxjs';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';

@Component({
  selector: 'app-nombre-menu-item-form',
  templateUrl: './nombre-menu-item-form.component.html',
  styleUrls: ['./nombre-menu-item-form.component.scss']
})
export class NombreMenuItemFormComponent implements OnInit,OnDestroy {
  thisseccion:SeccionMenu;
  $thisseccion:Observable<SeccionMenu>;
  subscriptionSeccion: Subscription;
  $thisMenuItem:Observable<MenuItem>;
  subscriptionMenuItem:Subscription;
  thismenuitem:MenuItem;
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
  ngOnDestroy(): void {

    if(this.subscriptionSeccion){
      this.subscriptionSeccion.unsubscribe();
    } 
    if(this.subscriptionMenuItem){
      this.subscriptionMenuItem.unsubscribe()
    }
  }

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
    this.thismenuitem = {} as MenuItem;
    this.thismenuitem.tamanos = new Array<PropiedadTamano>();
    
  }

  
  //Metodo de cierre de Dialogo
  public closeNombreMenuItemEvent(){
    this.dialogRef.close();
  }


  public nuevoTamanoEvent(){
    this.showPage(this.defineNextState('nuevoTamano'));
  }

  public nuevoSaborEvent(){
    this.showPage(this.defineNextState('nuevoSabor'));
  }

  public nuevoAgregadoEvent(){
    this.showPage(this.defineNextState('nuevoAgregado'));
  }

  public nuevaGuarnicion(){
    this.showPage(this.defineNextState('nuevaGuaranicion'));
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

      case 'listasaboresmenuitem':
            this.showNombre = false;
            this.showPropiedades = false;
            this.showListaTamanos = false;
            this.showListaSabores = true;
            this.showListaAgregados = false;
            this.showListaGuarniciones = false;
            this.showNuevoTamano = false;
            this.currentPage = 'listasaboresmenuitem';
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
      
    }
    //Caso diferentes tamaños solamente
    if((this.questionsSelection.tamano==1) && (this.questionsSelection.sabores==0) && (this.questionsSelection.agregados==0) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 2;
      
    }

    //Caso diferentes sabores solamente
    if((this.questionsSelection.tamano==0) && (this.questionsSelection.sabores==1) && (this.questionsSelection.agregados==0) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 3;
      
    }

    //Caso diferentes agregados solamente
    if((this.questionsSelection.tamano==0) && (this.questionsSelection.sabores==0) && (this.questionsSelection.agregados==1) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 4;
      
    }

    //Caso tiene guarniciones solamente
    if((this.questionsSelection.tamano==0) && (this.questionsSelection.sabores==0) && (this.questionsSelection.agregados==1) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 5;
      
    }
   
    //Caso tiene tamaño y sabores
    if((this.questionsSelection.tamano==1) && (this.questionsSelection.sabores==1) && (this.questionsSelection.agregados==1) && (this.questionsSelection.guarniciones==0))
    {
      this.tipoDeWizard = 6;
      
    }
    this.showPage(this.defineNextState("siguiente"));


  }

  
  private defineNextState(action:string=""):string{
    switch (this.currentPage){
      case 'propiedadesmenuitem':
        if(this.tipoDeWizard==1){
          if(action.localeCompare("siguiente")==0)
            return 'nuevoTamanomenuitem';
          else if(action.localeCompare("return")==0)
            return 'nombremenuitem';
          else
            return "";  
        }else if(this.tipoDeWizard==2){
          if(action.localeCompare("siguiente")==0)
            return 'listatamanosmenuitem';
          else if(action.localeCompare("return")==0)
            return 'nombremenuitem';
          else
            return "";
          
        }else if(this.tipoDeWizard==3){
          if(action.localeCompare("siguiente")==0)
              return 'nuevoTamanomenuitem';
          else if(action.localeCompare("return")==0)
              return 'nombremenuitem';
          else
              return "";

        }else if(this.tipoDeWizard==4){
          if(action.localeCompare("siguiente")==0)
            return 'listasagregadosmenuitem';
          else if(action.localeCompare("return")==0)
            return 'nombremenuitem';
          else
            return "";
        }else if(this.tipoDeWizard==5){
          if(action.localeCompare("siguiente")==0)
            return 'listasguarnicionesmenuitem';
            else if(action.localeCompare("return")==0)
            return 'nombremenuitem';
          else
            return "";
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
        }else if(this.tipoDeWizard==1){
          this.closeNombreMenuItemEvent();
          return '';
        }else{
          return '';
        }
        
          
        
        
     

      default:
        return 'nombremenuitem';
    }
  }

  //Metodo que llama a la API para crear un tamaño finalmente
  public crearTamano(tamano:PropiedadTamano){
   
    if(!this.thismenuitem._id){
      this.thismenuitem.nombre = this.nombre.value;
      this.thismenuitem.seccion = this.thisseccion._id;
      if(this.thismenuitem.tamanos)
        this.thismenuitem.tamanos = new Array<PropiedadTamano>();
      this.thismenuitem.tamanos.push(tamano);
      this.menulistFacade.createItemMenu(this.thismenuitem)
        .subscribe(
          (menuitem) => {
              this.thismenuitem = menuitem;
              this.$thisMenuItem = this.menulistFacade.menuitemStateById(this.thisseccion._id, this.thismenuitem._id);
              this.$thisMenuItem.subscribe(
                (menuitemModified) =>{
                    if(menuitemModified){
                      this.thismenuitem = menuitemModified;
                    
                  }
                }
              )
          })
      
      if(this.tipoDeWizard==1){
        this.closeNombreMenuItemEvent();
      }else{
        this.showPage(this.defineNextState());
      }
    }else{
      console.log("Se va a agregar un tamaño a:",this.thismenuitem);
      this.menulistFacade.addTamanoMenuItem(this.thismenuitem, tamano);
      this.showPage(this.defineNextState());

    }
    

  }

  public returnPropiedadesEvent(){
    this.showPage(this.defineNextState("return"));
  }

  
}
