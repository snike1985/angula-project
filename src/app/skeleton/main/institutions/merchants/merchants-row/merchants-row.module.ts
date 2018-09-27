import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';
import { HighlightModule }              from '../../../../../modules/highlight.module';
import { DatepickerControlModule }      from '../../../../../controls/datepicker-control/datepicker-control.module';
import { ActiveEffectModule }           from '../../../../../modules/active-effect.module';
import { RouterModule }                 from '@angular/router';

import { MerchantsRowComponent }        from './merchants-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HighlightModule,
    ActiveEffectModule,
    RouterModule,
    DatepickerControlModule
  ],
  declarations: [
    MerchantsRowComponent
  ],
  exports: [
    MerchantsRowComponent
  ]
})
export class MerchantsRowModule { }
