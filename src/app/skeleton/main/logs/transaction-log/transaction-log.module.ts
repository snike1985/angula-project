import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { TransactionsLogsRoutingModule }  from './transactions-logs-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { TransactionLogsTableModule } from './transaction-logs-table/transaction-logs-table.module';
import { TransactionLogsFilterModule } from './transaction-logs-filter/transaction-logs-filter.module';
import { TransactionLogsSearchModule } from './transaction-logs-search/transaction-logs-search.module';

import { TransactionLogComponent }        from './transaction-log.component';

@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    TransactionLogsTableModule,
    TransactionLogsFilterModule,
    TransactionLogsSearchModule,
    TransactionsLogsRoutingModule
  ],
  declarations: [
    TransactionLogComponent
  ]
})
export class TransactionLogModule { }
