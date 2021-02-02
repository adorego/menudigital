import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  @Output() private sendLoginForm = new EventEmitter<any>();
  form: FormGroup;
  private flatlogicEmail = 'admin@flatlogic.com';
  private flatlogicPassword = 'admin';

  constructor(private readonly formBuilder:FormBuilder) {
    this.form = this.formBuilder.group(
      {
        email: new FormControl(this.flatlogicEmail, [Validators.required, Validators.email]),
        password: new FormControl(this.flatlogicPassword, [Validators.required])
      });
   }

  ngOnInit(): void {
  }

  
  public login(): void {
    //console.log('LoginComponent.login()');
    if (this.form.valid) {
      this.sendLoginForm.emit(this.form.value);
    }
  }
}
