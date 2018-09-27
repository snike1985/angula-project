import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightModule } from '../../../../../modules/highlight.module';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';

import { TransactionLogRowComponent } from './transaction-log-row.component';


@NgModule( {
  imports: [
    CommonModule,
    HighlightModule,
    ActiveEffectModule
  ],
  declarations: [
    TransactionLogRowComponent
  ],
  exports: [
    TransactionLogRowComponent
  ]
} )
export class TransactionLogRowModule {
}
