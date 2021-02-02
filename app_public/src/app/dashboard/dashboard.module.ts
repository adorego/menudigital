import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportComponent } from './report/report.component';
import {DashboardRoutingModule} from './dashboard-routing.module';
import { VentasComponent } from './ventas/ventas.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import { SharedModule } from '../shared/shared.module';
import {DashBoardFacade} from './services/dasboard.facade';


@NgModule({
  declarations: [ReportComponent, VentasComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    SharedModule
  ],
  providers:[DashBoardFacade]
})
export class DashboardModule { }
