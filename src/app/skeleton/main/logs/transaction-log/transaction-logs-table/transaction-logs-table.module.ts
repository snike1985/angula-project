import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionLogRowModule } from '../transaction-log-row/transaction-log-row.module';

import { TransactionLogsTableComponent } from './transaction-logs-table.component';


@NgModule( {
  imports: [
    CommonModule,
    TransactionLogRowModule
  ],
  declarations: [
    TransactionLogsTableComponent
  ],
  exports: [
    TransactionLogsTableComponent
  ]
} )
export class TransactionLogsTableModule {
}
