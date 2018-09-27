import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { DevicesRowModule }       from '../devices-row/devices-row.module';

import { DevicesTableComponent }  from './devices-table.component';

@NgModule({
  imports: [
    CommonModule,
    DevicesRowModule
  ],
  declarations: [
    DevicesTableComponent
  ],
  exports: [
    DevicesTableComponent
  ]
})
export class DevicesTableModule { }
