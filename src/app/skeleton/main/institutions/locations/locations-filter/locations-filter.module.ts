import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { LocationsFilterComponent } from './locations-filter.component';

@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    LocationsFilterComponent
  ],
  exports: [
    LocationsFilterComponent
  ]
})
export class LocationsFilterModule { }
