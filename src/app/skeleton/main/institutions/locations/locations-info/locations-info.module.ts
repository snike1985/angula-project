import { NgModule } from '@angular/core';
import { CommonModule }               from '@angular/common';
import { LocationsInfoRoutingModule } from './locations-info-routing.module';
import { LocationsTableModule }       from '../locations-table/locations-table.module';
import { LocationsFilterModule }      from '../locations-filter/locations-filter.module';
import { LocationsSearchModule }      from '../locations-search/locations-search.module';
import { LocationsMapModule }         from '../locations-map/locations-map.module';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';

import { LocationsInfoComponent }     from './locations-info.component';


@NgModule( {
  imports: [
    CommonModule,
    LocationsFilterModule,
    LocationsSearchModule,
    PerfectScrollbarModule,
    LocationsTableModule,
    LocationsMapModule,
    LocationsInfoRoutingModule
  ],
  declarations: [
    LocationsInfoComponent
  ]
} )
export class LocationsInfoModule {
}
