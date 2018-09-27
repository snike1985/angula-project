import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { ReactiveFormsModule }        from '@angular/forms';

import { CurrenciesSearchComponent }  from './currencies-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [ CurrenciesSearchComponent ],
  exports: [ CurrenciesSearchComponent ]
})
export class CurrenciesSearchModule { }
