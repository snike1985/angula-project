import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';
import { HighlightModule }          from '../../../../../modules/highlight.module';
import { ActiveEffectModule }       from '../../../../../modules/active-effect.module';
import { RouterModule }             from '@angular/router';
import { DatepickerControlModule }  from '../../../../../controls/datepicker-control/datepicker-control.module';

import { DevicesRowComponent }      from './devices-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HighlightModule ,
    ActiveEffectModule,
    RouterModule,
    DatepickerControlModule
  ],
  declarations: [
    DevicesRowComponent
  ],
  exports: [
    DevicesRowComponent
  ]
})
export class DevicesRowModule { }
