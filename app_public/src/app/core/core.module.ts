import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import { httpInterceptorProviders } from './interceptors';
import { AuthenticationService } from './http/authentication.service';
import { UserStateService } from './state/user-state.service';
import { LocalStateService } from './state/local-state.service';
import { LocalConfigurationService } from './http/localConfiguration.service';
import { MenuItemsStateService } from './state/menuItems-state.service';
import { MenuConfigurationService } from './http/menuConfiguracion.service';
import { PublicMenuService } from './http/publicMenu.service';
import { SeccionesStateService } from './state/secciones-state.service';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    httpInterceptorProviders,
    AuthenticationService,
    LocalConfigurationService,
    UserStateService,
    LocalStateService,
    SeccionesStateService,
    MenuItemsStateService,
    MenuConfigurationService,
    PublicMenuService
    
    
    
    
  ]
})
export class CoreModule { }
