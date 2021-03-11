import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuComponent } from './container/main-menu/main-menu.component';
import { PublicMenuRoutingModule } from './public-menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { PublicMenuFacade } from './services/publicMenuFacade.service';



@NgModule({
  declarations: [MainMenuComponent],
  imports: [
    CommonModule,
    PublicMenuRoutingModule,
    SharedModule
  ],
  providers:[
    PublicMenuFacade
  ]
})
export class PublicMenuModule { }
