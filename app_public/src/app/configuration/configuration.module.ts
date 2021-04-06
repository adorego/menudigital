import { NgModule } from '@angular/core';

import { ConfigurationRoutingModule } from './configuration-routing.module';
import { LocalConfigurationComponent } from './local-configuration/local-configuration.component';
import { SharedModule } from '../shared/shared.module';
import { LocalConfigurationFacade } from './services/localConfigurationFacade.service';
import { MenuListComponent } from './menu-configuration/container/menu-list.component';
import { MenuListFacade } from './services/menuListFacade.service';
import { FormSeccionComponent } from './menu-configuration/components/form-seccion/form-seccion.component';
import { FormMenuItemComponent } from './menu-configuration/components/form-menu-item/form-menu-item.component';


@NgModule({
  declarations: [LocalConfigurationComponent, MenuListComponent, FormSeccionComponent, FormMenuItemComponent],
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
