import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { HighlightModule } from '../../../../../modules/highlight.module';
import { RouterModule } from '@angular/router';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { DatepickerControlModule } from '../../../../../controls/datepicker-control/datepicker-control.module';

import { InstitutionsRowComponent } from './institutions-row.component';

@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HighlightModule,
    ActiveEffectModule,
    RouterModule,
    DatepickerControlModule
  ],
  declarations: [
    InstitutionsRowComponent
  ],
  exports: [
    InstitutionsRowComponent
  ]
} )
export class InstitutionsRowModule {
}
