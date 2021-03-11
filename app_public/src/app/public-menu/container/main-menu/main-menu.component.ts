import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { CategoriaMenu } from 'src/app/core/models/categoria-menu.model';
import { Local } from 'src/app/core/models/local.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
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
    this.categorias$ = this.publicMenuFacade.getCategoriesState();
    this.local$ = this.publicMenuFacade.getLocalState();
    this.subLocalState = this.local$.subscribe(
      (local) => {
        if(local){
          this.nombrelocal = local.nombreDelLocal;
        }
      }
    )
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
