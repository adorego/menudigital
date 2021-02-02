import { Component, Inject, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import {FileValidator} from 'ngx-material-file-input';
import { ToastrService } from 'ngx-toastr';
import { MenuItemFacade } from '../../../services/menuItem.facade';
import {OpcionTamano} from '../../../../core/models/opcionTamano.model';
import { Promocion } from 'src/app/core/models/promocion.model';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.component.html',
  styleUrls: ['./menu-item.component.scss']
})
export class MenuItemComponent implements OnInit {
  stepTwo:boolean=false;
  isPromo:boolean = false;
  
  //Formulario de Promociones
  formGroupPromo:FormGroup;
  imagePromoURL:any = "../../../assets/images/photo-image.png";
  //Formulario de MenuItem
  formGroupMenuItem: FormGroup;
  tipoComida:number=0; //Selector de tipo de comida para desplegar distintos formularios
  //Tamaños diferentes
  tieneTamanos:boolean = false;
  showTamanos:boolean = false;
  imageMenuItemURL:string = "../../../assets/images/photo-image.png";
  tamanoFormGroupArray:FormGroup[];
  sabores:string[]= null;
  
  //ExtraToppings
  tieneExtraToppings:boolean = false;
  
  constructor(public dialogRef: MatDialogRef<MenuItemComponent>, private fb:FormBuilder,
    private menuItemFacade: MenuItemFacade, private toastr: ToastrService) {
      

  }

  ngOnInit(): void {
    //Inicialización de FormGroup de una Promo
    this.formGroupPromo = this.fb.group({
      nombre:[''],
      imagen:['', Validators.required],
      descripcion:['', Validators.required],
      precioAnterior:['', Validators.required],
      precioActual:['', Validators.required],
      descuento:[{value:'', disabled:true}, Validators.required]
    });
    //Inicialización de FormGroup de un MenuItem
    this.formGroupMenuItem = this.fb.group({
      categoria:['', Validators.required],
      nombre:[''],
      descripcion:[''],
      sabor:['', Validators.required],
      nuevoSabor:[{value:'', disabled:true}],
      cantidadTamanos:['1', Validators.required],
      tamanos: this.fb.array([]),
      });
    //Carga de los sabores predefinidos
    this.sabores = ["Catupiri con Pollo", "Napolitana", "Pepperoni"];
    
    
    
    
  }

  formatPrecioAnterior(){
    let nuevoValor = Number(this.formGroupPromo.get('precioAnterior').value).toLocaleString("es-PY");
    //let numberFormat = new Intl.NumberFormat("es-PY", {style: "currency", currency: "PYG"}).format(this.formGroupPromo.get('precioAnterior').value);
    //console.log('Reverse number', this.reverseFormatNumber(numberFormat, 'es'));
    //console.log('Reverse:', this.parseLocaleNumber(nuevoValor,'es'));
    const precioAnterior = this.formGroupPromo.get('precioAnterior').value;
    const precioActual = this.parseLocaleNumber(this.formGroupPromo.get('precioActual').value,'es');
    console.log('Precio actual:', precioActual);
    if(precioActual>0){
      const descuento = this.calcular_descuento(precioAnterior, precioActual)
      this.formGroupPromo.patchValue({
        precioAnterior:nuevoValor,
        descuento: descuento
      })
    }
    this.formGroupPromo.patchValue({
      precioAnterior:nuevoValor
    })
  }
  
  calcular_descuento(precioAnterior, precioActual):Number{
    const descuento = Math.round((precioAnterior-precioActual)/(precioAnterior)*100);
    return ( descuento);
  }
  onChangePrecioActual(){
    let precioActualFormated = Number(this.formGroupPromo.get('precioActual').value).toLocaleString("es-PY");
    let precioActual = this.formGroupPromo.get('precioActual').value;
    let precioAnterior = this.parseLocaleNumber(this.formGroupPromo.get('precioAnterior').value,'es');
    const descuento = this.calcular_descuento(precioAnterior, precioActual)
    this.formGroupPromo.patchValue({
      precioActual:precioActualFormated,
      descuento: descuento
    })

  }
  parseLocaleNumber(stringNumber, locale) {
    var thousandSeparator = Intl.NumberFormat(locale).format(11111).replace(/\p{Number}/gu, '');
    var decimalSeparator = Intl.NumberFormat(locale).format(1.1).replace(/\p{Number}/gu, '');

    return parseFloat(stringNumber
        .replace(new RegExp('\\' + thousandSeparator, 'g'), '')
        .replace(new RegExp('\\' + decimalSeparator), '.')
    );
}
  

  //Manejador de Foto de Promo
  openInputPromoFoto($event){
    document.getElementById("fileInput-promoFoto").click();
  }

  showPreviewPromo(event){
    const reader = new FileReader();
    
    if(event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);
    
      reader.onload = () => {
   
        this.imagePromoURL = reader.result as string;
     
        this.formGroupPromo.patchValue({
          imagen: file
        });
   
      };
   
    }
    
        
      
    
    
  }
  //Manejadores de evento de sabor nuevo
  saborDiferenteChecked(event){
    //console.log('Sabor Diferente:', event.checked);
    this.toogleNuevoSabor(event.checked);
    //event.checked ? this.nuevoSabor = true : this.nuevoSabor = false;
  }
  toogleNuevoSabor(value:boolean){
    value ? this.formGroupMenuItem.controls['nuevoSabor'].enable() : this.formGroupMenuItem.controls['nuevoSabor'].disable();
    
    
  }

  //Cerrar dialogo de Nuevo MenuItem
  onNoClick(){
    this.dialogRef.close();
  }

  //Selector de Promo o Menu permanente
  onPromoChange(event){
    //console.log('Valor en event:', event.value);
    if(event.value==1){
      this.isPromo=true;
      this.stepTwo = true;
    }else{
      this.isPromo=false;
      this.stepTwo = true;
    }
  }

  onMenuItemChange(event){
    this.tipoComida = event.value;
    //console.log('Tipo de comida seleccionnada:', this.tipoComida);
  }

  //Evento de ingreso de cantidad de tamaños diferentes
  onChangeCantidadTamanos(event){
    let cantidad = this.formGroupMenuItem.get('cantidadTamanos').value;
    let tamanoActual = this.tamanosformArr.length;
    const diferencia = cantidad - tamanoActual;
    //console.log('Cantidad de tamaños diferentes', cantidad);
    this.createDinamicFormArray(diferencia);
    //this.createDinamicFormArrayBack(cantidad);
    this.showTamanos=true;
  }

  createDinamicFormArray(cantidad:number){
    if(cantidad > 0){
      for(let i=0;i<cantidad;i++){
        this.addOpcionTamano();
      }
    }else if(cantidad < 0){
      //console.log('Cantidad:', cantidad);
      cantidad = -cantidad;
      for(let i=0;i<cantidad;i++){
        this.tamanosformArr.removeAt(this.tamanosformArr.length-1)
      }
      
      
    }
    
    
  }
  

  onPuedeTenerTamanosChange(event){
    if(event.value==1){
      this.tieneTamanos=true
    }else{
      this.tieneTamanos=false
     
    }
  }

  get tamanosformArr(): FormArray{
    return this.formGroupMenuItem.get('tamanos') as FormArray;
  }

  newOpcionTamano(): FormGroup {
    return this.fb.group({
      titulo:'',
      pedazos:'',
      imagen:'',
      imagenUrl:'',
      precio:'',
      cargado:false
    })
  }

  addOpcionTamano(){
    this.tamanosformArr.push(this.newOpcionTamano());
  }

  removeOpcionTamano(i:number){
    this.tamanosformArr.removeAt(i);
  }


  openInput(event, index:number){ 
    // your can use ElementRef for this later
    //console.log('openInput Parametro recibido:', index);
    const idFinal = "fileInput-"+index;
    document.getElementById(idFinal).click();
  }

  // Image Preview
  showPreview(event, index:number) {
    const file = (event.target as HTMLInputElement).files[0];
    this.tamanosformArr.at(index).patchValue({
      imagen: file
    });
    this.tamanosformArr.at(index).get('imagen').updateValueAndValidity();

    // File Preview
    const reader = new FileReader();
    reader.onload = () => {
      this.tamanosformArr.at(index).patchValue({
        imagenUrl: reader.result as string,
        cargado:true
      });
      
    }
    reader.readAsDataURL(file)
  }


   /**
   * this is used to perform the actual upload
   */
   upload() {
    console.log('sending this to server');
  }
  
  onSubmitPromo(){
    console.log('Datos de la Promo', this.formGroupPromo.value);
    const promocion:Promocion ={
      nombre: this.formGroupPromo.get('nombre').value,
      imagen: this.formGroupPromo.get('imagen').value,
      descripcion: this.formGroupPromo.get('descripcion').value,
      precioAnterior: this.parseLocaleNumber(this.formGroupPromo.get('precioAnterior').value, 'es'),
      precioActual: this.parseLocaleNumber(this.formGroupPromo.get('precioActual').value, 'es'),
      descuento: this.formGroupPromo.get('descuento').value

    }
    //console.log('Contenido de imagen:', promocion.imagen);
    //this.menuItemFacade.crearPromoPrueba(promocion.imagen);
    
    this.menuItemFacade.createPromo(promocion).subscribe(
      res => {
        //console.log('HTTP response', res);
        
        this.toastr.success('Se guardaron los cambios correctamente!');
      },
        err => {console.log('HTTP Error', err)
        
        this.toastr.error('No se guardaron los cambios correctamente!');
      },
        () => {console.log('HTTP request completed.');
      }
    )
    
  }

  onSubmitMenuItem(){
    console.log('Datos de la Promo', this.formGroupMenuItem.value);
  }
}
