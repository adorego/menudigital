import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscription } from 'rxjs';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { SeccionMenu } from 'src/app/core/models/seccion-menu.model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MenuListFacade } from '../../services/menuListFacade.service';
import { FormMenuItemComponent } from '../components/form-menu-item/form-menu-item.component';
import { FormSeccionComponent } from '../components/form-seccion/form-seccion.component';
import { NombreMenuItemFormComponent } from '../components/nombre-menu-item-form/nombre-menu-item-form.component';
import { NuevoTamanoComponent } from '../components/nuevo-tamano/nuevo-tamano.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {
  
  secciones$:Observable<SeccionMenu[]>;
  tituloNuevaSeccion:string;
  tituloNuevoMenuItem:string;
  seccionSubscription:Subscription;
  menuItemSubscription:Subscription;

  constructor(public dialog: MatDialog,private fb: FormBuilder, private menuListFacade: MenuListFacade) 
  {


  }
  
  ngOnDestroy(): void {
    if(this.menuItemSubscription)
      this.menuItemSubscription.unsubscribe();
    if(this.seccionSubscription)
      this.seccionSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.tituloNuevaSeccion = " Nueva Sección";
    this.tituloNuevoMenuItem = "Nuevo Menú Item"
    this.secciones$ = this.menuListFacade.seccionesState();
    this.menuListFacade.updateSeccionState();
    
  }

  public nueva_seccion(){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '20px',
      'left': '10px'
    };
    dialogConfig.width = '320px';
    dialogConfig.height = '550px';
    dialogConfig.minWidth = '300px';
    dialogConfig.minHeight = '300px';
    //dialogConfig.panelClass = "my-dialog";
    const dialogRef = this.dialog.open(FormSeccionComponent, dialogConfig);   
    this.seccionSubscription = dialogRef.componentInstance.onSaveSeccion.subscribe(
      (seccionMenu) => {
        this.menuListFacade.createSeccion(seccionMenu);
      }
    )
    

    
  }

  nuevo_item(seccionParam:SeccionMenu){
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '20px',
      'left': '10px'
    };
    dialogConfig.width = '320px';
    dialogConfig.height = '550px';
    dialogConfig.minWidth = '300px';
    dialogConfig.minHeight = '300px';
    dialogConfig.maxHeight = '100vh';
    //dialogConfig.panelClass = "my-dialog";
    dialogConfig.data ={
      seccion:seccionParam
    }
    const dialogRef = this.dialog.open(NombreMenuItemFormComponent, dialogConfig);   
    this.menuItemSubscription = dialogRef.componentInstance.onSaveMenuItem.subscribe(
      (menuItem) => {
        //Enviar el nuevo MenuItem a la BD
      }
    )
  }

  eliminar_seccion(seccion:SeccionMenu){
    this.menuListFacade.deleteSeccion(seccion);
  }
  eliminar_menuitem(menuitem:MenuItem){
    this.menuListFacade.deleteItemMenu(menuitem);

  }
  
}
