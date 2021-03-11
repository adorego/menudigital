import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { CategoriaMenu } from 'src/app/core/models/categoria-menu.model';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { AlertDialogComponent } from 'src/app/shared/alert-dialog/alert-dialog.component';
import { MenuListFacade } from '../../services/menuListFacade.service';
import { AddMenuItemComponent } from '../components/add-menu-item/add-menu-item.component';

@Component({
  selector: 'app-menu-list',
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.scss']
})
export class MenuListComponent implements OnInit, OnDestroy {
  
  showMessage:boolean=false;
  message:string='';

  showNewCategory=false;
  categoriaForm:FormGroup;
  categorias$:Observable<CategoriaMenu[]>;

  panelOpenState = false;

  //NuevoMenuItem
  menuItemInsertado:Observable<MenuItem>;//Observable que devuelve el sistema cuando se inserta un nuevo MenuItem

  //Table
  columnasDelMenuItem: string[] = ['imagenUrl', 'nombre', 'descripcion','precioActual', 'acciones'];
  

  constructor(public dialog: MatDialog,private fb: FormBuilder, private menuListFacade: MenuListFacade) 
  {


  }
  
  ngOnDestroy(): void {
    
  }

  ngOnInit(): void {
    this.categoriaForm = this.fb.group({
      _id:[''],
      titulo:['', Validators.required],
      descripcion:[''],
      puesto:['', Validators.required]
    });

    this.categorias$ = this.menuListFacade.categoriasState();
    this.menuListFacade.updateCategoriasState();
  }

  public nuevaCategoria(){
    this.showNewCategory = !this.showNewCategory;    

  }

  public nuevoItem(categoria:CategoriaMenu){
    //console.log('Nuevo Item:', categoria);
    const nuevoItemDialogRef = this.dialog.open(AddMenuItemComponent,{
        width:'100%',
        height:'100%',
        position:{top:'0', right:'0'}
      });
      nuevoItemDialogRef.componentInstance.categoria = categoria;
      nuevoItemDialogRef.componentInstance.nuevoItem.subscribe(
        (menuItem:MenuItem) =>{
          //console.log('MenuItem nuevo:', menuItem);
          this.menuListFacade.createItemMenu(menuItem)
          .subscribe(
            (menuItem) =>{
              //console.log('MenuItem insertado:', menuItem);
              nuevoItemDialogRef.componentInstance.actualizar_itemInsertado(menuItem, 1);
            }
          )
          
          
        }
      );
  
  }

  public verDetallesItem(seleccionMenuItem:MenuItem){
      //console.log('verDetallesItem:', seleccionMenuItem);
      const detalleItemDialogRef = this.dialog.open(AddMenuItemComponent,{
        width:'100%',
        height:'100%',
        position:{top:'0', right:'0'}
      });
      detalleItemDialogRef.componentInstance.itemInsertado = seleccionMenuItem;
  }

  public editarItem(toeditMenuItem:MenuItem){
      const editarItemDialogRef = this.dialog.open(AddMenuItemComponent,{
        width:'100%',
        height:'100%',
        position:{top:'0', right:'0'}
      });
      editarItemDialogRef.componentInstance.itemInsertado = toeditMenuItem;
      console.log('editarItem:', toeditMenuItem);
  }

  public eliminarItem(todeleteMenuItem:MenuItem){
    console.log('eliminarItem:', todeleteMenuItem);
    const deleteItemDialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        titulo:"Desea eliminar este MenuItem?",
        
      },
      width:'280px',
      height:'400px',
      position:{top:'0%', right:'0%'},
      disableClose:false
    })
    deleteItemDialogRef.afterClosed().subscribe(
      (respuesta) => {
        console.log('Respuesta del Dialogo es:', respuesta);
        if(respuesta){
          //Si la respuesta es SI, entonces eliminar este MenuItem
          this.menuListFacade.deleteItemMenu(todeleteMenuItem);
        }
      }
    )
  }
  
  //Categorias

  public editarCategory(categoria){

  }

  public eliminarCategory(toDeleteCategoria){
    console.log('Categoria a eliminar:', toDeleteCategoria);
    const deleteCategoryDialogRef = this.dialog.open(AlertDialogComponent,{
      data:{
        titulo:"Desea eliminar esta Categoria?",
        
      },
      width:'320px',
      height:'400px',
      position:{top:'0%', right:'0%'},
      disableClose:false
    })
    deleteCategoryDialogRef.afterClosed().subscribe(
      (respuesta) => {
        console.log('Respuesta del Dialogo es:', respuesta);
        if(respuesta){
          //Si la respuesta es SI, entonces eliminar este MenuItem
          this.menuListFacade.deleteCategoria(toDeleteCategoria);
        }
      }
    )

  }
  public submitCategoria(){
    if(this.categoriaForm.valid){
      console.log('Submit new Category');
      this.menuListFacade.createCategoria(this.categoriaForm.value)
      this.categoriaForm.reset();
      this.showNewCategory=false;
      
      
    }
  }

  public tooltip(accion:string):string{
    switch (accion) {
      case('ver'):
        return 'Ver los detalles de este Item';
      case('borrar'):
        return 'Eliminar este Item';
      case('editar'):
        return 'Editar este Item';    
      default:
        return null;  
    }

  }
  
}
