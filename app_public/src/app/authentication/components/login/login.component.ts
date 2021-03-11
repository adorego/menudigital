import { Component, EventEmitter, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'login-app',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
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
  }

  
  //Cerrar dialogo de Nuevo MenuItem
  public onNoClick(){
    this.dialogRef.close();
  }
  public login(): void {
    //console.log('LoginComponent.login()');
    this.dialogRef.close();
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.value);
    }
  }

}
