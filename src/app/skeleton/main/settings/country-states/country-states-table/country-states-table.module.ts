import { NgModule }                    from '@angular/core';
import { CommonModule }                from '@angular/common';
import { CountryStateRowModule }       from '../country-state-row/country-state-row.module';

import { CountryStatesTableComponent } from './country-states-table.component';


@NgModule({
  imports: [
    CommonModule,
    CountryStateRowModule
  ],
  declarations: [
    CountryStatesTableComponent
  ],
  exports: [
    CountryStatesTableComponent
  ]
})
export class CountryStatesTableModule { }
