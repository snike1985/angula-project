import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { CountryRowModule }        from '../country-row/country-row.module';

import { CountriesTableComponent } from './countries-table.component';


@NgModule({
  imports: [
    CommonModule,
    CountryRowModule
  ],
  declarations: [
    CountriesTableComponent
  ],
  exports: [
    CountriesTableComponent
  ]
})
export class CountriesTableModule { }
