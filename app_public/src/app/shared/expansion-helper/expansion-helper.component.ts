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
  
  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {

  }

  public generate_formGroups(index:number):FormGroup[]{
    
    for(let i:number; i < index;i++){
      this.formGroupTamanos.push(this.fb.group({
        titulo:['', Validators.required],
        descripcion:[''],
        precio:['', Validators.required],
        imagen:[''],
        imagenUrl:['']
      })
      );
    }
    return this.formGroupTamanos;
    
  }
    

}
