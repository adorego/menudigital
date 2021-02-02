import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PedidosDiariosComponent } from './pedidos-diarios/pedidos-diarios.component';


const routes: Routes = [
  {
    path: '',
    component: PedidosDiariosComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PedidosRoutingModule { }