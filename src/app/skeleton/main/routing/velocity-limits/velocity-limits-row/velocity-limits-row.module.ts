import { NgModule } from '@angular/core';
import { RowModule } from '../../../../../modules/row.module';

import { VelocityLimitsRowComponent } from './velocity-limits-row.component';


@NgModule( {
  imports: [
    RowModule
  ],
  declarations: [
    VelocityLimitsRowComponent
  ],
  exports: [
    VelocityLimitsRowComponent
  ]
} )
export class VelocityLimitsRowModule {
}
