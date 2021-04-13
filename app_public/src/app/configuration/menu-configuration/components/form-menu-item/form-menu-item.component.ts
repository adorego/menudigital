import { Observable, of } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from 'src/app/core/models/menuItem.model';
import { ExpansionArrayModel } from 'src/app/core/models/expansion-helper-array.model';

@Component({
  selector: 'app-form-menu-item',
  templateUrl: './form-menu-item.component.html',
  styleUrls: ['./form-menu-item.component.scss']
})
export class FormMenuItemComponent implements OnInit {

  

  
  constructor(private dialogRef:MatDialogRef<FormMenuItemComponent>) { }

  @Output() onSaveMenuItem = new EventEmitter<MenuItem>();

  ngOnInit(): void {
    
  }

  public crear_menuItem(){
    
  }
  

  public onNoClick(){
    this.dialogRef.close();
  }

  public dataForExpansionHelper():Observable<ExpansionArrayModel>{
    return(
      of(
        {
          titulo:"Tamaños disponibles",
          tipo:1,
          conDatos:true,
          arrayTamano:[
            {
              id:'98978787',
              titulo:'Grande',
              descripcion:'',
              precio:0,
              
              
            },
            {
              id:'98978788',
              titulo:'Mediano',
              descripcion:'',
              precio:0,
              
              
            },
            {
              id:'98978789',
              titulo:'Gigante',
              descripcion:'',
              precio:0,
              
              
            }
          ]
        }
      )
    
    );

  }
}
