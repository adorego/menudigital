import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Local } from 'src/app/core/models/local.model';
import { LocalConfigurationFacade } from '../services/localConfigurationFacade.service';

@Component({
  selector: 'app-local-configuration',
  templateUrl: './local-configuration.component.html',
  styleUrls: ['./local-configuration.component.scss']
})
export class LocalConfigurationComponent implements OnInit, OnDestroy {

  local$:Observable<Local>;

  subscriptionLocal$:Subscription;
  
  localForm: FormGroup;

  message: string='';
  showMessage:boolean = false;

  constructor(private fb: FormBuilder, private localconfigurationFacade: LocalConfigurationFacade) { }
  
  ngOnDestroy(): void {
    this.subscriptionLocal$.unsubscribe()

  }

  ngOnInit(): void {
    this.localForm = this.fb.group({
      _id:[''],
      nombreDelLocal: ['', Validators.required],
      ruc: ['', Validators.required],
      direccionDelLocal:['', Validators.required],
      nombreDelContacto: ['', Validators.required],
      emailDelContacto:['', Validators.required],
      celularDelContacto:['', Validators.required],
      urlMenuDigital:['', Validators.required],
      localNameUrl:['', Validators.required]
    });
   
    this.local$ = this.localconfigurationFacade.updateLocalState();

    this.actualizar_campos(); 

    
  }

  private actualizar_campos():void{
   
    this.subscriptionLocal$ = this.local$.subscribe(
      (local) =>{
        
          this.localForm.patchValue(local[0]);
          this.verificarMenuDigitalUrl();
        
      }
    )
  }

  public verificarMenuDigitalUrl(){
    let value:string = this.localForm.get('urlMenuDigital').value;
    let nombre:string = this.localForm.get('nombreDelLocal').value;
    let localNombreUrl:string = this.localForm.get('localNameUrl').value;
    
    
    
    if(value=='' && nombre!=''){
      let propuestaUrlMenu = this.localForm.get('nombreDelLocal').value.toLowerCase().replace(/\s/g, '');
      this.localconfigurationFacade.queryUrlMenu(propuestaUrlMenu).subscribe(
        (urlMenu) => {
          const num = urlMenu.lastIndexOf('/');

          this.localForm.patchValue({
            urlMenuDigital: urlMenu,
            localNameUrl: urlMenu.substring(num+1)
          })
          
        }
      )
    }
    if(localNombreUrl == '' && value.length>0){
      const num = value.lastIndexOf('/');
      this.localForm.patchValue({
        
        localNameUrl: value.substring(num+1)
      })
    }
    
    if(this.localForm.invalid){
      this.message ="Por favor completa todos los campos para poder crear tu MenuDigital";
      this.showMessage = true;
    }
    

    
  }

  public modificarNombre(){
    let propuestaUrlMenu = this.localForm.get('nombreDelLocal').value.toLowerCase().replace(/\s/g, '');
      this.localconfigurationFacade.queryUrlMenu(propuestaUrlMenu).subscribe(
        (urlMenu) => {
          this.localForm.patchValue({
            urlMenuDigital: urlMenu
          })
        }
      )
  }

  
  public onSubmit(){
    this.localconfigurationFacade.saveLocal(this.localForm.value);
  }

}
