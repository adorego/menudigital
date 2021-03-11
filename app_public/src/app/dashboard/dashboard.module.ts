import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';



@NgModule({
  declarations: [ReportDashboardComponent],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
