import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { MonitoringComponent }      from './monitoring.component';

const routes: Routes = [
  {
    path: '',
    component: MonitoringComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MonitoringRoutingModule { }
