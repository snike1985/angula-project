import { NgModule }               from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { DevicesFilterComponent } from './devices-filter.component';


@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    DevicesFilterComponent
  ],
  exports: [
    DevicesFilterComponent
  ]
})
export class DevicesFilterModule { }
