import { NgModule }                     from '@angular/core';

import { InstitutionsFilterComponent }  from './institutions-filter.component';
import { FilterModule } from '../../../../../modules/filter.module';

@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    InstitutionsFilterComponent
  ],
  exports: [
    InstitutionsFilterComponent
  ]
})
export class InstitutionsFilterModule { }
