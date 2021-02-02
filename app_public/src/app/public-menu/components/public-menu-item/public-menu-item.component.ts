import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { PersonalizarMenuItemComponent } from '../personalizar-menu-item/personalizar-menu-item.component';

@Component({
  selector: 'app-public-menu-item',
  templateUrl: './public-menu-item.component.html',
  styleUrls: ['./public-menu-item.component.scss']
})
export class PublicMenuItemComponent implements OnInit {

  @Input() menuItem:MenuItem;
  cantidad:number=1;//Selector de cantidades de un MenuItem
  @Output() personalizacionSelected = new EventEmitter();
  
  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  agregar_carrito(){
    console.log('Agregar a carrito,', this.menuItem, 'cantidad:', this.cantidad);
  }

  handleMinus() {
    this.cantidad--;  
  }
  handlePlus() {
    this.cantidad++;    
  }

  personalizar(selectedMenuItem:MenuItem){
    /*
    console.log('MenuItem:', menuItem);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.position ={
      'top': '0',
      'right': '0'
    };
    dialogConfig.width = '100%';
    dialogConfig.height = '100%';
    dialogConfig.panelClass = 'my-dialog';
    const dialogRef = this.dialog.open(PersonalizarMenuItemComponent, dialogConfig);

    dialogRef.afterClosed().subscribe(result => {
      
    });
    */
   this.personalizacionSelected.emit(selectedMenuItem);
  }
}
