import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MenuItem } from 'src/app/core/models/menuItem.model';

@Component({
  selector: 'app-form-menu-item',
  templateUrl: './form-menu-item.component.html',
  styleUrls: ['./form-menu-item.component.scss']
})
export class FormMenuItemComponent implements OnInit {

  menuItemFormGroup:FormGroup;
  imagenMenuItem:string = "../../../../assets/camara.png";

  
  constructor(private fb:FormBuilder, public dialogRef: MatDialogRef<FormMenuItemComponent>) { }

  @Output() onSaveMenuItem = new EventEmitter<MenuItem>();

  ngOnInit(): void {
    this.menuItemFormGroup = this.fb.group(
      {
        imagen:[''],
        imagenUrl:[''],
        titulo:['', Validators.required],
        descripcion:[''],
        precio:['', Validators.required]
      }
    )
  }

  public crear_menuItem(){
    
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
     
        this.menuItemFormGroup.patchValue({
          imagen: file
        });
   
      };
    }
  }

  public onNoClick(){
    this.dialogRef.close();
  }

}
