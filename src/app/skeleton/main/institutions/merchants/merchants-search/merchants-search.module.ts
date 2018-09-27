import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { ReactiveFormsModule }       from '@angular/forms';

import { MerchantsSearchComponent }  from './merchants-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    MerchantsSearchComponent
  ],
  exports: [
    MerchantsSearchComponent
  ]
})
export class MerchantsSearchModule { }
