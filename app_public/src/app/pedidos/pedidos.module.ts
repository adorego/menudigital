import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PedidosDiariosComponent } from './pedidos-diarios/pedidos-diarios.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { PedidosRoutingModule } from './pedidos-routing.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [PedidosDiariosComponent],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    PedidosRoutingModule,
    SharedModule
  ]
})
export class PedidosModule { }
