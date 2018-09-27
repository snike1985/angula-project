import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { TransactionLogItemModule } from '../transaction-log-item/transaction-log-item.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { TransactionLogSingleComponent } from './transaction-log-single.component';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    TransactionLogItemModule,
    PerfectScrollbarModule
  ],
  declarations: [
    TransactionLogSingleComponent
  ]
})
export class TransactionLogSingleModule { }
