import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';

import { MonitoringComponent }      from './monitoring.component';

import { MonitoringRoutingModule }  from './monitoring-routing.module';

@NgModule({
  imports: [
    CommonModule,
    MonitoringRoutingModule
  ],
  declarations: [
      MonitoringComponent
  ]
})
export class MonitoringModule { }
