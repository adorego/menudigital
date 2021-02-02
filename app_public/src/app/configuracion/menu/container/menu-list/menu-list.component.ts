import { ConstantPool } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';
import { MenuItemFacade } from 'src/app/configuracion/services/menuItem.facade';
import { Promocion } from 'src/app/core/models/promocion.model';
import { SidebarLink } from 'src/app/core/models/sidebarlink';
import { PromocionesStateService } from 'src/app/core/state/promocion-state.service';
import {MenuItemComponent} from '../../components/menu-item/menu-item.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit {

  promociones$:Observable<Promocion[]>;
  iconoPromociones$:Observable<String>;

  constructor(public dialog: MatDialog, private menuItemFacade: MenuItemFacade, private toastr: ToastrService) { 
    this.promociones$ = this.menuItemFacade.getPromotionState();
    this.iconoPromociones$ = this.menuItemFacade.getIconoPromocionesState();
  }

  ngOnInit(){
    console.log('ngOninit()');
    this.menuItemFacade.loadMenuitemsPromociones().subscribe(
      res => {
        console.log('HTTP response', res);
        
        //this.toastr.success('Se guardaron los cambios correctamente!');
      },
        err => {console.log('HTTP Error', err)
        
        //this.toastr.error('No se guardaron los cambios correctamente!');
      },
        () => {console.log('HTTP request completed.');
      }
    )
    
  }

  nuevoMenuItem():void{
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '0',
      'right': '0'
    };
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = 'my-dialog';
    const dialogRef = this.dialog.open(MenuItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
    });
  }

  eliminar_menuItem(promocion:Promocion){
    console.log('Eliminar Menu Item:', promocion);
    this.menuItemFacade.eliminarPromocion(promocion).subscribe(
      res => {
        console.log('HTTP response', res);
        
        this.toastr.success('Se guardaron los cambios correctamente!');
      },
        err => {console.log('HTTP Error', err)
        
        this.toastr.error('No se guardaron los cambios correctamente!');
      },
        () => {console.log('HTTP request completed.');
      }
    
    )
  }

  getSideBarLinks():Observable<SidebarLink[]>{
    return this.menuItemFacade.getSideBarLinks();
  }
}

