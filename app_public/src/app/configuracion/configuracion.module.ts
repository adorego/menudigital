import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocalComponent } from './local/local.component';
import { ConfiguracionRoutingModule } from './configuracion-routing.module';
import { SharedModule } from '../shared/shared.module';
import {ConfigurationFacade} from './services/configuration.facade';
import { MenuListComponent } from './menu/container/menu-list/menu-list.component';
import { MenuItemComponent } from './menu/components/menu-item/menu-item.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MenuItemFacade } from './services/menuItem.facade';

@NgModule({
  declarations: [LocalComponent, MenuListComponent, MenuItemComponent],
  imports: [
    CommonModule,
    ConfiguracionRoutingModule,
    SharedModule,
    ReactiveFormsModule
  ],
  providers:[ConfigurationFacade, MenuItemFacade]
})
export class ConfiguracionModule { }
