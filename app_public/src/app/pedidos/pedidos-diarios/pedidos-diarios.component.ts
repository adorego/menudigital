import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { PedidosDiariosDataSource, PedidosDiariosItem } from './pedidos-diarios-datasource';

@Component({
  selector: 'app-pedidos-diarios',
  templateUrl: './pedidos-diarios.component.html',
  styleUrls: ['./pedidos-diarios.component.css']
})
export class PedidosDiariosComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<PedidosDiariosItem>;
  dataSource: PedidosDiariosDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new PedidosDiariosDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
