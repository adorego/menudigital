import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {AuthenticationService} from './authentication/authentication-services';
import {DataService} from './authentication/data-service';
import {ConfigurationService} from './configuration/configuration-services';
import {LocalStateService} from './state/local-state.service';
import {CategoriesStateService} from './state/categories-state.service';
import {PromocionesStateService} from './state/promocion-state.service';
import { LocalService } from './configuration/local-services';
import { UserSideBarLinksStateService } from './state/userSideBarLinks-state.service';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers:[
    AuthenticationService,
    DataService,
    ConfigurationService,
    LocalStateService,
    LocalService,
    CategoriesStateService,
    PromocionesStateService,
    UserSideBarLinksStateService

  ]
})
export class CoreModule { }
