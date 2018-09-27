import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { CountryStatesTableModule }     from './country-states-table/country-states-table.module';
import { PerfectScrollbarModule }       from 'ngx-perfect-scrollbar';
import { CountryStatesSearchModule }    from './country-states-search/country-states-search.module';
import { CountryStatesFilterModule }    from './country-states-filter/country-states-filter.module';
import { CountryStatesRoutingModule }   from './country-states-routing.module';

import { CountryStatesComponent }       from './country-states.component';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    CountryStatesTableModule,
    CountryStatesSearchModule,
    CountryStatesFilterModule,
    CountryStatesRoutingModule
  ],
  declarations: [
    CountryStatesComponent
  ]
})
export class CountryStatesModule { }
