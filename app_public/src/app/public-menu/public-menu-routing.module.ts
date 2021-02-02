import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainMenuListComponent } from './container/main-menu/main-menu-list.component';


const routes: Routes = [
  {
    path: '',
    component: MainMenuListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicMenuRoutingModule { }