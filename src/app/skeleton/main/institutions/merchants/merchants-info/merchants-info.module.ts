import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MerchantsInfoRoutingModule } from './merchants-info-routing.module';
import { MerchantsTableModule } from '../merchants-table/merchants-table.module';
import { MerchantsFilterModule } from '../merchants-filter/merchants-filter.module';
import { MerchantsSearchModule } from '../merchants-search/merchants-search.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { MerchantsInfoComponent } from './merchants-info.component';


@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    MerchantsTableModule,
    MerchantsFilterModule,
    MerchantsSearchModule,
    MerchantsInfoRoutingModule
  ],
  declarations: [
    MerchantsInfoComponent
  ]
} )
export class MerchantsInfoModule {
}
