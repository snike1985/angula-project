import { NgModule }                     from '@angular/core';
import { DeviceTypesRoutingModule }     from './devices-type-routing.module';
import { PerfectScrollbarModule }       from 'ngx-perfect-scrollbar';
import { DeviceTypesTableModule }       from './device-types-table/device-types-table.module';
import { CommonModule }                 from '@angular/common';
import { DeviceTypesFilterModule }      from './device-types-filter/device-types-filter.module';
import { DeviceTypesSearchModule }      from './device-types-search/device-types-search.module';

import { DeviceTypesComponent }         from './device-types.component';

import { DeviceTypesRequestsService }   from '../../../../services/main/settings/device-types-requests.service';


@NgModule({
  imports: [
    CommonModule,
    DeviceTypesFilterModule,
    DeviceTypesSearchModule,
    PerfectScrollbarModule,
    DeviceTypesTableModule,
    DeviceTypesRoutingModule
  ],
  declarations: [
    DeviceTypesComponent
  ]
})
export class DeviceTypesModule { }
