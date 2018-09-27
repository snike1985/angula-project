import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { CurrencyRowModule }         from '../currency-row/currency-row.module';

import { CurrenciesTableComponent }  from './currencies-table.component';


@NgModule({
  imports: [
    CommonModule,
    CurrencyRowModule
  ],
  declarations: [
    CurrenciesTableComponent
  ],
  exports: [
    CurrenciesTableComponent
  ]
})
export class CurrenciesTableModule { }
