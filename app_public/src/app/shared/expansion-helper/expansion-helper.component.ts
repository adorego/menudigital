import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { ExpansionArrayModel } from 'src/app/core/models/expansion-helper-array.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-expansion-helper',
  templateUrl: './expansion-helper.component.html',
  styleUrls: ['./expansion-helper.component.scss']
})
export class ExpansionHelperComponent implements OnInit {
  @Input() $expansionArrayData:Observable<ExpansionArrayModel>;
  formGroupTamanos:FormGroup[];
  data:ExpansionArrayModel;
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.$expansionArrayData.subscribe(
      (data)=>{
        this.generate_formGroups(data.arrayTamano.length);
        this.data = data;
        console.log('Datos cargados:', data);
      }
    )
  }

  public generate_formGroups(index:number){
    console.log('Antes de inicializar formGroupTamanos:', index);
    if(!this.formGroupTamanos){
      this.formGroupTamanos = new Array<FormGroup>(index);
    }
    for(let i=0; i < index;i++){
      this.formGroupTamanos.push(this.fb.group({
        titulo:['', Validators.required],
        descripcion:[''],
        precio:['', Validators.required],
        imagen:[''],
        imagenUrl:['']
      }));
      console.log('formGroupTamanos tamano:', this.formGroupTamanos.length);
    }
    //console.log('Despues de inicializar formGroupTamanos:', this.formGroupTamanos.length);
    
  }
    

}
