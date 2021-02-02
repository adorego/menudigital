import { NgModule } from '@angular/core';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthPageComponent } from './container/auth-page/auth-page.component';
import {AuthenticationFacade} from './services/authentication.facade';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import {PasswordMatchValidationService} from './services/passwordMatchValidation.service';

@NgModule({
  declarations: [
    LoginComponent, RegisterComponent, AuthPageComponent
  ],
  imports: [
   ReactiveFormsModule,
   SharedModule
  
  ],
  exports:[
    AuthPageComponent
    
  ],
  providers:[
    AuthenticationFacade,
    PasswordMatchValidationService

  ]
})
export class AuthenticationModule { }