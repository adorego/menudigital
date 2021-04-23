import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //@ViewChild("correo") inputCorreo:ElementRef;
  @Output() sendLoginForm = new EventEmitter<any>();
  form: FormGroup;
  

  constructor(private readonly formBuilder:FormBuilder, public dialogRef: MatDialogRef<LoginComponent>) {
    this.form = this.formBuilder.group(
      {
        email: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [Validators.required])
      });
   }

  ngOnInit(): void {
    document.getElementById('correoid').focus();
  }

  ngAfterViewInit(){
   // this.inputCorreo.nativeElement.focus();
  }
  
  //Cerrar dialogo de Nuevo MenuItem
  public closeEvent(){
    this.dialogRef.close();
  }
  public login(): void {
    //console.log('LoginComponent.login()');
    
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.value);
      
    }
  }

}
