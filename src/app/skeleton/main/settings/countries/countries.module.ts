import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { CountriesRoutingModule }     from './countries-routing.module';
import { CountriesTableModule }       from './countries-table/countries-table.module';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';
import { CountriesSearchModule }      from './countries-search/countries-search.module';
import { CountriesFilterModule }      from './countries-filter/countries-filter.module';

import { CountriesComponent }         from './countries.component';


@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    CountriesTableModule,
    CountriesRoutingModule,
    CountriesSearchModule,
    CountriesFilterModule
  ],
  declarations: [
    CountriesComponent,
  ]
})
export class CountriesModule { }
