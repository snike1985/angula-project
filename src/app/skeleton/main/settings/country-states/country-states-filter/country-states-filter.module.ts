import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { CountryStatesFilterComponent } from './country-states-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    CountryStatesFilterComponent
  ],
  exports: [
    CountryStatesFilterComponent
  ]
} )
export class CountryStatesFilterModule {
}
