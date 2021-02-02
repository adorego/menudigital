import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
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
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule)
  },
  {
    path: 'configuracion',
    loadChildren: () => import('./configuracion/configuracion.module').then(m => m.ConfiguracionModule)
  },
  {
    path: 'pedidos',
    loadChildren: () => import('./pedidos/pedidos.module').then(m => m.PedidosModule)
  },
  {
    path: 'menudigital',
    loadChildren: () => import('./public-menu/public-menu.module').then(m => m.PublicMenuModule)
    
  }
  
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }
