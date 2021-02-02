import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainMenuListComponent } from './container/main-menu/main-menu-list.component';
import { PublicMenuRoutingModule } from './public-menu-routing.module';
import { SharedModule } from '../shared/shared.module';
import { MainMenuFacade } from './services/mainMenu.facade';
import { PublicMenuItemComponent } from './components/public-menu-item/public-menu-item.component';
import { PersonalizarMenuItemComponent } from './components/personalizar-menu-item/personalizar-menu-item.component';



@NgModule({
  declarations: [MainMenuListComponent, PublicMenuItemComponent, PersonalizarMenuItemComponent],
  imports: [
    CommonModule,
    PublicMenuRoutingModule,
    SharedModule
  ],
  providers:[MainMenuFacade]
})
export class PublicMenuModule { }
