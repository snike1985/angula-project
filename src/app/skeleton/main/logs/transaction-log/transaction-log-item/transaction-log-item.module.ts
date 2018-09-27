import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionLogItemComponent } from './transaction-log-item.component';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    TransactionLogItemComponent
  ],
  exports: [
    TransactionLogItemComponent
  ]
} )
export class TransactionLogItemModule {
}
