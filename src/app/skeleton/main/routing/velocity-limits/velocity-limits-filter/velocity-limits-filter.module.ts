import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { VelocityLimitsFilterComponent } from './velocity-limits-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    VelocityLimitsFilterComponent
  ],
  exports: [
    VelocityLimitsFilterComponent
  ]
} )
export class VelocityLimitsFilterModule {
}
