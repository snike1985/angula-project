import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TransactionLogXmlComponent } from './transaction-log-xml.component';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';


@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule
  ],
  declarations: [
    TransactionLogXmlComponent
  ],
  exports: [
    TransactionLogXmlComponent
  ]
} )
export class TransactionLogXmlModule {
}
