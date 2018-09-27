import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { CountriesFilterComponent } from './countries-filter.component';

@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    CountriesFilterComponent
  ],
  exports: [
    CountriesFilterComponent
  ]
} )
export class CountriesFilterModule {
}
