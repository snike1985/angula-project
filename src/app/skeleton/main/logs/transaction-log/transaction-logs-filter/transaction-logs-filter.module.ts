import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { TransactionLogsFilterComponent } from './transaction-logs-filter.component';
import { ReviewPipe } from '../../../../../pipes/review.pipe';
import { NumberFormatPipe } from '../../../../../pipes/number-format.pipe';
import { AmountControlModule } from '../../../../../controls/amount-control/amount-control.module';


@NgModule( {
  imports: [
    FilterModule,
    AmountControlModule
  ],
  declarations: [
    TransactionLogsFilterComponent,
    ReviewPipe
  ],
  exports: [
    TransactionLogsFilterComponent
  ],
  providers: [
    NumberFormatPipe
  ]
} )
export class TransactionLogsFilterModule {
}
