import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';
import { SwitchControlModule }      from '../../../../../controls/switch-control/switch-control.module';
import { HighlightModule }          from '../../../../../modules/highlight.module';

import { DeviceTypesRowComponent }  from './device-types-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule
  ],
  declarations: [
    DeviceTypesRowComponent
  ],
  exports: [
    DeviceTypesRowComponent
  ]
})
export class DeviceTypesRowModule { }
