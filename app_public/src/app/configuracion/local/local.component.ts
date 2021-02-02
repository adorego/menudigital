import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { ConfigurationFacade } from '../services/configuration.facade';
import {Local} from '../../core/models/local-model';
import { catchError, tap } from 'rxjs/operators';
import { SidebarLink } from 'src/app/core/models/sidebarlink';

@Component({
  selector: 'app-local',
  templateUrl: './local.component.html',
  styleUrls: ['./local.component.scss']
})
export class LocalComponent implements OnInit{
  
  uiState ={
    editar:false,
    guardar:false,
    loading:false

  }
  local$:Observable<Local>;
  
  localForm: FormGroup;
  
  constructor(private fb: FormBuilder, private configurationFacade: ConfigurationFacade, private toastr: ToastrService) {}

  ngOnInit(){
    
    this.localForm = this.fb.group({
      _id:[''],
      nombreDelLocal: ['', Validators.required],
      ruc: ['', Validators.required],
      direccionDelLocal:['', Validators.required],
      nombreDelContacto: ['', Validators.required],
      emailDelContacto:['', Validators.required],
      celularDelContacto:['', Validators.required]
    });
    this.local$ = this.configurationFacade.getLocalByUserId()
                  .pipe(tap(
                    local => 
                      {
                        if(Array.isArray(local) && local.length>0){
                            this.localForm.controls['_id'].setValue(local[0]._id);
                            this.localForm.controls['nombreDelLocal'].setValue(local[0].nombreDelLocal);
                            this.localForm.controls['ruc'].setValue(local[0].ruc);
                            this.localForm.controls['direccionDelLocal'].setValue(local[0].direccionDelLocal);
                            this.localForm.controls['nombreDelContacto'].setValue(local[0].nombreDelContacto);
                            this.localForm.controls['emailDelContacto'].setValue(local[0].emailDelContacto);
                            this.localForm.controls['celularDelContacto'].setValue(local[0].celularDelContacto);
                            //console.log('Resultado:', local);
                            //console.log('LocalForm:', this.localForm.value);
                            this.uiState = {
                              editar:false,
                              guardar:false,
                              loading:false
                            }
                          }
                    }
                  ));

    this.local$.subscribe({
                    next: x => console.log('Resultado:',x),
                    error: error => console.log('Error', error),
                    complete: () => console.log('Complete'),
                    
                  });

       
  }
                  
  editar(){
    
  }
  
  onSubmit() {
    //console.log('LocalComponent.onSumit.localForm', this.localForm.value);
    let response$:Observable<Local>;
    if(this.localForm.controls['_id'].value){
      //Actualizar
      response$ = this.configurationFacade.updateByLocalId(this.localForm.value);
    }else{
      
      //Crear nuevo
      console.log('Crear nuevo local:', this.localForm.value);
      response$ = this.configurationFacade.addLocal(this.localForm.value)
    }
    
    response$.subscribe(
      res => {
              //console.log('HTTP response', res);
              
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
    return this.configurationFacade.getSidebarLinks();
  }
}
