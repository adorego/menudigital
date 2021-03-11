import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LocalConfigurationComponent } from './local-configuration/local-configuration.component';
import { MenuListComponent } from './menu-configuration/container/menu-list.component';

const routes: Routes = [
  {
    path: '',
    component: LocalConfigurationComponent
  },
  {
    path: 'local',
    component: LocalConfigurationComponent
  },
  {
    path: 'menu',
    component: MenuListComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConfigurationRoutingModule { }
