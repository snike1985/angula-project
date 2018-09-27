import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule }      from '@angular/forms';

import { CountriesSearchComponent } from './countries-search.component';

@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ CountriesSearchComponent ],
  exports: [ CountriesSearchComponent ]
} )
export class CountriesSearchModule {
}
