import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoriaMenu } from 'src/app/core/models/categoria-menu.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { OpcionTamano } from 'src/app/core/models/opcion-tamano.model';
import { OpcionPromocion } from 'src/app/core/models/opcion-promocion.model';
import { OpcionesPersonalizacion } from 'src/app/core/models/opciones-personalizacion.model';

@Component({
  selector: 'app-add-menu-item',
  templateUrl: './add-menu-item.component.html',
  styleUrls: ['./add-menu-item.component.scss']
})
export class AddMenuItemComponent implements OnInit {

  formGroupMenuItem:FormGroup;
  //Promociones
  formGroupPromocion:FormGroup;
  showNuevaPromocion:boolean = false;
  vigenciaDiasDeLaSemana:boolean = false;
  vigenciaPeriodoFechas:boolean = false;
  //Tabla de promocion vigente
  columnasDeLaPromocion: string[] = ['descuento','vigencia', 'acciones'];
  
  //Tamaño
  formGroupTamano:FormGroup;
  //Tabla de tamaños
  columnasDeTamano:string[] = ['nombre', 'precio', 'acciones'];
  showNuevoTamano:boolean = false;

  //Sabores
  formGroupSabor:FormGroup;
  showNuevoSabor:boolean = false;
  tieneCostoAdicional = false;

  imagenMenuItem:string = "../../../../assets/camara.png";
  opcionesPersonalizacion:OpcionesPersonalizacion[];
  @Output() nuevoItem = new EventEmitter<MenuItem>();
  @Output() actualizarItem = new EventEmitter<MenuItem>();
  @Input() itemInsertado:MenuItem;
  //Array de Promocion para la tabla de Promoción vigente
  promoArray:OpcionPromocion[] =[];
  //Array de Tamanos para tabla de Tamanos
  tamanoArray:OpcionTamano[] = [];
  @Input() categoria:CategoriaMenu;
  tabindex:number=0;
  panelOpenState:boolean;


  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<AddMenuItemComponent>) { }

  ngOnInit(): void {
    
    this.formGroupMenuItem = this.fb.group({
      _id:[''],
      nombre:['',Validators.required],
      imagen:['', Validators.required],
      descripcion:['', Validators.required],
      tamano:[''],
      precio:['', Validators.required],
      categoria:[this.categoria, Validators.required],
      
    });

    this.formGroupPromocion = this.fb.group({
      _id:[''],
      precioActual:['', Validators.required],
      precioAnterior:['', Validators.required],
      descuento:['', Validators.required],
      promoDias:[false, Validators.required],
      lunes:[{value:false, disabled:true}, Validators.required],
      martes:[{value:false, disabled:true}, Validators.required],
      miercoles:[{value:false, disabled:true}, Validators.required],
      jueves:[{value:false, disabled:true}, Validators.required],
      viernes:[{value:false, disabled:true}, Validators.required],
      sabado:[{value:false, disabled:true}, Validators.required],
      domingo:[{value:false, disabled:true}, Validators.required],
      promoPorFechas:[false, Validators.required],
      fechaInicio:[{value:'', disabled:true}],
      fechaFin:[{value:'', disabled:true}]

    });

    this.formGroupTamano = this.fb.group({
      _id:[''],
      tamano:['', Validators.required],
      pedazos:[''],
      cantsabores:[''],
      comensales:['', Validators.required],
      precio:['', Validators.required]
    });
    
    this.formGroupSabor = this.fb.group({
      _id:[''],
      nombre:['', Validators.required],
      descripcion:[''],
      costoAdicional: this.fb.array([])
      
    });


    if(this.itemInsertado && this.itemInsertado._id){
      this.actualizar_itemInsertado(this.itemInsertado, 0);
    }

    this.opcionesDePersonalizacionInicial();
  }

  //Controla el formulario de Nueva Promo
  public nuevaPromocion(){
    this.showNuevaPromocion = ! this.showNuevaPromocion;

  }

  
  public eliminar_promocion(element){
    console.log('Eliminar promocion:', element);
  }

  //Controla la habilitación de la vigencia en días de la semana
  public changePromoDias(value){
    //console.log('Valor:', value);
    if(value!=null && value.checked){
      this.formGroupPromocion.get('lunes').enable();
      this.formGroupPromocion.get('martes').enable();
      this.formGroupPromocion.get('miercoles').enable();
      this.formGroupPromocion.get('jueves').enable();
      this.formGroupPromocion.get('viernes').enable();
      this.formGroupPromocion.get('sabado').enable();
      this.formGroupPromocion.get('domingo').enable();
      this.formGroupPromocion.get('promoPorFechas').disable();
      this.formGroupPromocion.get('fechaInicio').disable();
      this.formGroupPromocion.get('fechaFin').disable();
    }
    if(value!=null && !value.checked){
      this.formGroupPromocion.get('lunes').disable();
      this.formGroupPromocion.get('martes').disable();
      this.formGroupPromocion.get('miercoles').disable();
      this.formGroupPromocion.get('jueves').disable();
      this.formGroupPromocion.get('viernes').disable();
      this.formGroupPromocion.get('sabado').disable();
      this.formGroupPromocion.get('domingo').disable();
      this.formGroupPromocion.get('promoPorFechas').enable();
      this.formGroupPromocion.get('fechaInicio').disable();
      this.formGroupPromocion.get('fechaFin').disable();
    }

  }

  public changePromoFechas(value){
    //console.log('Valor:', value);
    if(value!=null && value.checked){
      this.formGroupPromocion.get('lunes').disable();
      this.formGroupPromocion.get('martes').disable();
      this.formGroupPromocion.get('miercoles').disable();
      this.formGroupPromocion.get('jueves').disable();
      this.formGroupPromocion.get('viernes').disable();
      this.formGroupPromocion.get('sabado').disable();
      this.formGroupPromocion.get('domingo').disable();
      this.formGroupPromocion.get('promoDias').disable();
      this.formGroupPromocion.get('fechaInicio').enable();
      this.formGroupPromocion.get('fechaFin').enable();
    }
    if(value!=null && !value.checked){
      this.formGroupPromocion.get('lunes').disable();
      this.formGroupPromocion.get('martes').disable();
      this.formGroupPromocion.get('miercoles').disable();
      this.formGroupPromocion.get('jueves').disable();
      this.formGroupPromocion.get('viernes').disable();
      this.formGroupPromocion.get('sabado').disable();
      this.formGroupPromocion.get('domingo').disable();
      this.formGroupPromocion.get('promoDias').enable();
      this.formGroupPromocion.get('fechaInicio').disable();
      this.formGroupPromocion.get('fechaFin').disable();
    }

  }
  public setPrecioAnterior(){
    let descuentoAplicar = ((this.formGroupPromocion.get('precioAnterior').value - this.formGroupPromocion.get('precioActual').value)/this.formGroupPromocion.get('precioAnterior').value);
    //console.log('Descuento a aplicar:', descuentoAplicar);
    this.formGroupPromocion.patchValue({
      descuento: descuentoAplicar
    });
  }
  public actualizar_itemInsertado(itemInsertado:MenuItem, tabNumber:number){
    
    this.formGroupMenuItem.patchValue(itemInsertado);
    this.imagenMenuItem = itemInsertado.imagenUrl;
    this.formGroupPromocion.patchValue({
      precioActual:itemInsertado.precio
    });
    
    if(this.itemInsertado.promocion != null && this.itemInsertado.promocion != undefined){
      this.promoArray.push(itemInsertado.promocion);
      
    }
   
    //Tamanos
    if(this.itemInsertado.tamanos == null || this.itemInsertado.tamanos == undefined){
      if(this.itemInsertado.tamano != null && this.itemInsertado.tamano != undefined){
        let tamanovar:OpcionTamano = {
          tamano: this.itemInsertado.tamano,
          precio: this.itemInsertado.precio
        }
        this.itemInsertado.tamanos = [tamanovar];
      }
      
    }


    this.tabindex = tabNumber;

    //console.log('una vez actualizados los forms:', this.formGroupMenuItem, this.formGroupPromocion);
  }

  public onSubmitMenuItem(){
    let _id = this.formGroupMenuItem.get('_id').value;
    this.itemInsertado = this.formGroupMenuItem.value;

    if(String(_id).length>0){
      //Es una actualización
      this.actualizarItem.emit(this.itemInsertado);
    }else{
      //Es un alta
      this.nuevoItem.emit(this.itemInsertado);
    }
    
    
  }

  public nuevoTamano(){
    this.showNuevoTamano = ! this.showNuevoTamano;
  }

  public onSubmitTamano(){
    //Agregar tamano a itemInsertado
  }

  public nuevoSabor(){
    this.showNuevoSabor = !this.showNuevoSabor;
  }

  public saborConCostoAdicional($event){

  }
  public onSubmitSabor(){
    
  }
  public eliminar_tamano(element){

  }
  public onSubmitPromocion(){
    
    //console.log(this.formGroupPromocion.value);
    //Inicializacion del Array de Promociones
    if(this.itemInsertado.promocion == null || this.itemInsertado.promocion == undefined){
      this.itemInsertado.promocion = {} as OpcionPromocion;
      
    }
    this.itemInsertado.promocion.precioActual = this.formGroupPromocion.get('precioActual').value;
    this.itemInsertado.promocion.precioAnterior = this.formGroupPromocion.get('precioAnterior').value;
    this.itemInsertado.promocion.descuento = this.formGroupPromocion.get('descuento').value;
    //let controles = this.formGroupPromocion.controls;
    //console.log('Controles de FormPromocion:', controles);
    if(this.formGroupPromocion.get('promoDias')){
      if(this.formGroupPromocion.get('domingo').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [0];
        }else{
          this.itemInsertado.promocion.dias_semana.push(0);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('lunes').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [1];
        }else{
          this.itemInsertado.promocion.dias_semana.push(1);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('martes').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [2];
        }else{
          this.itemInsertado.promocion.dias_semana.push(2);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('miercoles').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [3];
        }else{
          this.itemInsertado.promocion.dias_semana.push(3);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('jueves').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [4];
        }else{
          this.itemInsertado.promocion.dias_semana.push(4);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('viernes').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [5];
        }else{
          this.itemInsertado.promocion.dias_semana.push(5);//Domingo es 0
        }
      }
      if(this.formGroupPromocion.get('sabado').value == true){
        if(this.itemInsertado.promocion.dias_semana == null || this.itemInsertado.promocion.dias_semana == undefined){
          this.itemInsertado.promocion.dias_semana = [6];
        }else{
          this.itemInsertado.promocion.dias_semana.push(6);//Domingo es 0
        }
      }
      this.itemInsertado.promocion.tipo_promocion = 'DiasDeLaSemana';

    }else if(this.formGroupPromocion.get('promoPorFechas')){
      this.itemInsertado.promocion.fechaInicio = this.formGroupPromocion.get('fechaInicio').value;
      this.itemInsertado.promocion.fechaFin = this.formGroupPromocion.get('fechaFin').value;
      this.itemInsertado.promocion.tipo_promocion = 'PeriodoConFechas';
    }else{
      this.itemInsertado.promocion.tipo_promocion = 'Permanente';
    }
    this.actualizarItem.emit(this.itemInsertado);
  }

  private opcionesDePersonalizacionInicial(){
    this.opcionesPersonalizacion = [
      {
        titulo:"Promoción",
        descripcion:"Esta personalización la utilizas cuando este Item tiene un descuento",
        tipo:1
      },
      {
        titulo:"Tamaños diferentes",
        descripcion:"Si este Item puede ser de diferentes tamaños",
        tipo:2
      },
      {
        titulo:"Sabores diferentes",
        descripcion:"Descuento temporal de este Item",
        tipo:3
      }

    ]
  }

  public subirFoto(event){
    document.getElementById("fileInput-menuItem").click();
  }

  public showPreviewMenuItemFoto(event){
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imagenMenuItem = reader.result as string;
     
        this.formGroupMenuItem.patchValue({
          imagen: file
        });
   
      };
    }
  }

  public onNoClick(){
    this.dialogRef.close();
  }
}
