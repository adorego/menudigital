import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthenticationRoutingModule } from './authentication-routing.module';
import { LoginComponent } from './components/login/login.component';
import { AuthPageComponent } from './container/auth-page/auth-page.component';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './components/register/register.component';
import { PasswordMatchValidationService } from './services/passwordMatchValidation.service';
import { AuthFacade } from './services/authFacade.service';



@NgModule({
  declarations: [LoginComponent, AuthPageComponent, RegisterComponent],
  imports: [
    AuthenticationRoutingModule,
    SharedModule,
  ],
  providers:[
    PasswordMatchValidationService,
    AuthFacade
  ]
})
export class AuthenticationModule { }
