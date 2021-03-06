import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReportDashboardComponent } from './report-dashboard/report-dashboard.component';


const routes: Routes = [
  {
    path: '',
    component: ReportDashboardComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }