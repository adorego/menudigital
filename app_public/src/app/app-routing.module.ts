import { NgModule } from '@angular/core';
import { RouterModule, Routes} from '@angular/router';
import {AuthPageComponent} from './authentication/container/auth-page/auth-page.component';

const routes:Routes = [
  {
    path: 'login',
    component: AuthPageComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuration/configuration.module').then(m => m.ConfigurationModule)
  },
  {
    path: 'menudigital/:nombrelocal',
    loadChildren: () => import('./public-menu/public-menu.module').then(m => m.PublicMenuModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
