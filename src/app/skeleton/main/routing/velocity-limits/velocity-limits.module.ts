import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';

import { VelocityLimitsComponent }        from './velocity-limits.component';

import { VelocityLimitsRoutingModule }    from './velocity-limits-routing.module';

@NgModule({
  imports: [
    CommonModule,
    VelocityLimitsRoutingModule
  ],
  declarations: [
    VelocityLimitsComponent
  ]
})
export class VelocityLimitsModule { }
