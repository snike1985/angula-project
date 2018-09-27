import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { CountryStatesSearchComponent } from './country-states-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ CountryStatesSearchComponent ],
  exports: [ CountryStatesSearchComponent ]
})
export class CountryStatesSearchModule { }
