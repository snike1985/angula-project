import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { CurrenciesFilterComponent } from './currencies-filter.component';


@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    CurrenciesFilterComponent
  ],
  exports: [
    CurrenciesFilterComponent
  ]
})
export class CurrenciesFilterModule { }
