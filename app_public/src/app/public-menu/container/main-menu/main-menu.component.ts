import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CategoriaMenu } from 'src/app/core/models/categoria-menu.model';
import { CostoAdicionalSabor } from 'src/app/core/models/costo-adicional-sabor.model';
import { DetalleItem } from 'src/app/core/models/detalle-item.model';
import { Local } from 'src/app/core/models/local.model';
import { MenuItemPersonalizado } from 'src/app/core/models/menuitem-personalizado.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { OpcionSabor } from 'src/app/core/models/opcion-sabor.model';
import { OpcionTamano } from 'src/app/core/models/opcion-tamano.model';
import { PublicMenuFacade } from '../../services/publicMenuFacade.service';

@Component({
  selector: 'app-main-menu',
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']
})
export class MainMenuComponent implements OnInit, OnDestroy {
  nombrelocal:string;
  private sub:Subscription;
  private subLocalState:Subscription;

  //Categorias del Menu
  categorias$:Observable<CategoriaMenu[]>;

  //Nombre del local
  local$:Observable<Local>;

  //MenuItem
  cantidad:number=1;//Selector de cantidades de un MenuItem
  imagenAlternativa="../../../../assets/camara.png";

  //Seleccion de tamaños
  tamanos:boolean[];
  @ViewChildren('tamanocheckbox') components:QueryList<MatCheckbox>;

  //
  lista_detalles:MenuItemPersonalizado = {};

  constructor(private route: ActivatedRoute, private publicMenuFacade:PublicMenuFacade) {

   }
  

  ngOnInit(): void {
    //console.log('MainMenu, ngOnInit:', this.route.snapshot.params);
    this.sub = this.route.params.subscribe(params => {
      const nombrelocalParam = params['nombrelocal'];
      console.log('Nombre del local seleccionado:', this.nombrelocal);
      //this.publicMenuFacade.getMenuDigital(nombrelocalParam);
      this.publicMenuFacade.getCategoriasPrueba();
    });
    this.tamanos = new Array<boolean>();
    this.categorias$ = this.publicMenuFacade.getCategoriesState()
                      .pipe(shareReplay(1));
    
    
    this.local$ = this.publicMenuFacade.getLocalState();
    this.subLocalState = this.local$.subscribe(
      (local) => {
        if(local){
          this.nombrelocal = local.nombreDelLocal;
        }
      }
    )
  }

  ngAfterViewInit(){
    console.log(this.components.toArray());
  }
  public agregar_carrito(menuitem:MenuItem){
    console.log('Agregar a carrito,', menuitem, 'cantidad:', this.cantidad);
  }

  public costoAdicional(sabor:OpcionSabor, tamanoid:string):CostoAdicionalSabor{
    let encontrado:CostoAdicionalSabor;
    if(sabor.costoAdicional != null && sabor.costoAdicional.length>0){
        sabor.costoAdicional.find(
        (costoAdicional) => {
          if(costoAdicional.tamano == tamanoid)
           encontrado = costoAdicional;
        });
      return encontrado;  
    }else{
      return null;
    }

  }

  public selectTamano(indice:number, menuItem:MenuItem,tamano:OpcionTamano){
    console.log('Selected component:', this.components.get(indice));
    let component:MatCheckbox = this.components.get(indice);
    if(component.checked==true){
      this.deseleccionar_checkboxes(indice);
      let detalle_item:DetalleItem = {"principal":true,"detalle_item":this.crear_descripcion_detalle(menuItem, tamano), "precio":tamano.precio};
      this.agregar_subitem(true, detalle_item);
    }
    


  }

  private crear_descripcion_detalle(menuItem:MenuItem, tamano:OpcionTamano):string{
     let descripcion = menuItem.detalle_factura + " "+ tamano.tamano;
      if(tamano.pedazos){
        descripcion += " (" + tamano.pedazos + " "+ "pedazos" + ")";
      }
      return descripcion;
  }

  private agregar_subitem(item_principal:boolean, detalle:DetalleItem){
    if(this.lista_detalles.item_principal && item_principal){
      console.log('Agregar_subitem con item')
      this.eliminar_subitem(true);
      this.lista_detalles.item_principal = true;
      if(!this.lista_detalles.detalle){
        this.lista_detalles.detalle = new Array<DetalleItem>();
      }
      this.lista_detalles.detalle.push(detalle);
    }
    if(!this.lista_detalles.item_principal){
      console.log('Agregar_subitem sin item');
      this.lista_detalles.item_principal = true;
      if(!this.lista_detalles.detalle){
        this.lista_detalles.detalle = new Array<DetalleItem>();
      }
      this.lista_detalles.detalle.push(detalle);
    }

  }

  public eliminar_subitem(principal:boolean, index?:number){
    if(principal){
      this.lista_detalles = {};
    }
    if(index){
      this.lista_detalles.detalle.splice(index, 1);
    }

  }

  private deseleccionar_checkboxes(indice:number){
    this.components.forEach((elemento, index)=>
    {
      if(index!=indice){
       elemento.checked = false;
      }
      
    });
  }
  //Metododo para devolver el simbolo de la operacion del costo adicional
  public operacion(sabor:OpcionSabor, tamanoid:string){
    let costoAdicionalSabor:CostoAdicionalSabor = this.costoAdicional(sabor, tamanoid);
    if(costoAdicionalSabor.operacion ==1){
      return '+';
    }else if(costoAdicionalSabor.operacion == 2){
      return '-';
    }else{
      return '';
    }
  }

  public siguienteTamano(indice:number):boolean{
   this.tamanos[indice]=false;
   return this.tamanos[indice];
  }
  public handleMinus() {
    this.cantidad--;  
  }
  public handlePlus() {
    this.cantidad++;    
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
    this.subLocalState.unsubscribe();
  }
}
