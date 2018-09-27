import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { MerchantsRowModule }         from '../merchants-row/merchants-row.module';

import { MerchantsTableComponent }    from './merchants-table.component';

@NgModule({
  imports: [
    CommonModule,
    MerchantsRowModule
  ],
  declarations: [
    MerchantsTableComponent
  ],
  exports: [
    MerchantsTableComponent
  ]
})
export class MerchantsTableModule { }
