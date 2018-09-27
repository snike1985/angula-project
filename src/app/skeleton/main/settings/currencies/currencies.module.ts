import { NgModule }                   from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrenciesRoutingModule }    from './currencies-routing.module';
import { CurrenciesSearchModule } from './currencies-search/currencies-search.module';
import { CurrenciesFilterModule } from './currencies-filter/currencies-filter.module';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';
import { CurrenciesTableModule }      from './currencies-table/currencies-table.module';

import { CurrenciesComponent }        from './currencies.component';

@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    CurrenciesTableModule,
    CurrenciesSearchModule,
    CurrenciesFilterModule,
    CurrenciesRoutingModule
  ],
  declarations: [
    CurrenciesComponent
  ]
} )
export class CurrenciesModule {
}
