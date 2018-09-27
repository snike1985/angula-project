import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { ReactiveFormsModule }       from '@angular/forms';
import { SwitchControlModule }       from '../../../../../controls/switch-control/switch-control.module';
import { HighlightModule }           from '../../../../../modules/highlight.module';

import { CountryStateRowComponent }  from './country-state-row.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule
  ],
  declarations: [
    CountryStateRowComponent
  ],
  exports: [
    CountryStateRowComponent
  ]
})
export class CountryStateRowModule { }
