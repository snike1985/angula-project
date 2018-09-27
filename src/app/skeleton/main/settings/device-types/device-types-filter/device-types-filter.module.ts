import { NgModule }                    from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { DeviceTypesFilterComponent }  from './device-types-filter.component';


@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    DeviceTypesFilterComponent
  ],
  exports: [
    DeviceTypesFilterComponent
  ]
})
export class DeviceTypesFilterModule { }
