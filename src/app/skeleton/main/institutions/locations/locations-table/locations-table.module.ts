import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationRowModule } from '../location-row/location-row.module';

import { LocationsTableComponent } from './locations-table.component';


@NgModule( {
  imports: [
    CommonModule,
    LocationRowModule
  ],
  declarations: [
    LocationsTableComponent
  ],
  exports: [
    LocationsTableComponent
  ]
} )
export class LocationsTableModule {
}
