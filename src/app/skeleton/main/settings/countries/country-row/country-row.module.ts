import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';
import { HighlightModule }      from '../../../../../modules/highlight.module';

import { SwitchControlModule }  from '../../../../../controls/switch-control/switch-control.module';

import { CountryRowComponent }  from './country-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule
  ],
  declarations: [
    CountryRowComponent
  ],
  exports: [
    CountryRowComponent
  ]
})
export class CountryRowModule { }
