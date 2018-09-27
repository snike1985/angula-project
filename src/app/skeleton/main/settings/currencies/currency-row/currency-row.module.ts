import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { SwitchControlModule }   from '../../../../../controls/switch-control/switch-control.module';
import { ReactiveFormsModule }   from '@angular/forms';
import { HighlightModule }       from '../../../../../modules/highlight.module';

import { CurrencyRowComponent }  from './currency-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule
  ],
  declarations: [
    CurrencyRowComponent
  ],
  exports: [
    CurrencyRowComponent
  ]
})
export class CurrencyRowModule { }
