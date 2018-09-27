import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';
import { DevicesInfoRoutingModule }   from './devices-info-routing.module';
import { DevicesFilterModule }        from '../devices-filter/devices-filter.module';
import { DevicesSearchModule }        from '../devices-search/devices-search.module';
import { DevicesTableModule }         from '../devices-table/devices-table.module';

import { DevicesInfoComponent }       from './devices-info.component';

@NgModule({
  imports: [
    CommonModule,
    DevicesFilterModule,
    DevicesSearchModule,
    PerfectScrollbarModule,
    DevicesTableModule,
    DevicesInfoRoutingModule
  ],
  declarations: [
    DevicesInfoComponent
  ]
})
export class DevicesInfoModule { }
