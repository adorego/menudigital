import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainMenuComponent } from './container/main-menu/main-menu.component';

const routes:Routes = [
    {
        path: '',
        component: MainMenuComponent
    }
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  })
export class PublicMenuRoutingModule { }