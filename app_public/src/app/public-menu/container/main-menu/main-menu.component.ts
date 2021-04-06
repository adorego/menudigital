import { Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { MatCheckbox } from '@angular/material/checkbox';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { shareReplay } from 'rxjs/operators';
import { CostoAdicionalSabor } from 'src/app/core/models/costo-adicional-sabor.model';
import { DetalleItem } from 'src/app/core/models/detalle-item.model';
import { Local } from 'src/app/core/models/local.model';
import { MenuItemPersonalizado } from 'src/app/core/models/menuitem-personalizado.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { OpcionSabor } from 'src/app/core/models/opcion-sabor.model';
import { OpcionTamano } from 'src/app/core/models/opcion-tamano.model';
import { SeccionMenu } from 'src/app/core/models/seccion-menu.model';
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

  //Secciones del Menu
  secciones$:Observable<SeccionMenu[]>;

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
      this.publicMenuFacade.getMenuDigital(nombrelocalParam);
      //this.publicMenuFacade.getSeccionesPrueba();
    });
    this.tamanos = new Array<boolean>();
    this.secciones$ = this.publicMenuFacade.getSeccionesState()
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
