import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { TransactionLogsSearchComponent } from './transaction-logs-search.component';


@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    TransactionLogsSearchComponent
  ],
  exports: [
    TransactionLogsSearchComponent
  ]
} )
export class TransactionLogsSearchModule {
}
