import { NgModule }                         from '@angular/core';
import { CommonModule }                     from '@angular/common';

import { VelocityLimitsInfoRoutingModule }  from './velocity-limits-info-routing.module';
import { VelocityLimitsInfoComponent }      from './velocity-limits-info.component';
import { PerfectScrollbarModule }           from 'ngx-perfect-scrollbar';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    VelocityLimitsInfoRoutingModule
  ],
  declarations: [
    VelocityLimitsInfoComponent
  ]
})
export class VelocityLimitsInfoModule { }
