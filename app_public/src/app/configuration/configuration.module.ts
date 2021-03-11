import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { LocalConfigurationComponent } from './local-configuration/local-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { LocalConfigurationFacade } from './services/localConfigurationFacade.service';

import { MenuListComponent } from './menu-configuration/container/menu-list.component';
import { AddPromoComponent } from './menu-configuration/components/add-promo/add-promo.component';
import { ListCategoriesComponent } from './menu-configuration/components/list-categories/list-categories.component';
import { MenuListFacade } from './services/menuListFacade.service';
import { AddCaracteristicasComponent } from './menu-configuration/components/add-caracteristicas/add-caracteristicas.component';
import { AddMenuItemComponent } from './menu-configuration/components/add-menu-item/add-menu-item.component';


@NgModule({
  declarations: [LocalConfigurationComponent, MenuListComponent,AddPromoComponent, ListCategoriesComponent, AddCaracteristicasComponent, AddMenuItemComponent],
  imports: [
    ConfigurationRoutingModule,
    SharedModule
  ],
  providers:[
    LocalConfigurationFacade,
    MenuListFacade
  ]
})
export class ConfigurationModule { }
