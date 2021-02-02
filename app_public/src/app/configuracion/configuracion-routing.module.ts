import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LocalComponent } from './local/local.component';
import { MenuListComponent } from './menu/container/menu-list/menu-list.component';



const routes: Routes = [
  {
    path: '',
    component: LocalComponent
  },
  {
    path: 'local',
    component: LocalComponent
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
export class ConfiguracionRoutingModule { }