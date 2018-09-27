import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionLogJsonComponent } from './transaction-log-json.component';
import { PrettyJsonModule } from 'angular2-prettyjson';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule( {
  imports: [
    CommonModule,
    PrettyJsonModule,
    PerfectScrollbarModule
  ],
  declarations: [
    TransactionLogJsonComponent
  ],
  exports: [
    TransactionLogJsonComponent
  ]
} )
export class TransactionLogJsonModule {
}
