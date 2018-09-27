import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { DeviceTypesRowModule }       from '../device-types-row/device-types-row.module';

import { DeviceTypesTableComponent }  from './device-types-table.component';


@NgModule({
  imports: [
    CommonModule,
    DeviceTypesRowModule
  ],
  declarations: [
    DeviceTypesTableComponent
  ],
  exports: [
    DeviceTypesTableComponent
  ]
})
export class DeviceTypesTableModule { }
