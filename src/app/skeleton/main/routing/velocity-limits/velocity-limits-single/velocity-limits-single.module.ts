import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { VelocityLimitsSingleRoutingModule } from './velocity-limits-single-routing.module';
import { VelocityLimitsSingleComponent } from './velocity-limits-single.component';

@NgModule({
  imports: [
    CommonModule,
    VelocityLimitsSingleRoutingModule
  ],
  declarations: [VelocityLimitsSingleComponent]
})
export class VelocityLimitsSingleModule { }
