import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { AccessLogsFilterComponent } from './access-logs-filter.component';


@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [ AccessLogsFilterComponent ],
  exports: [ AccessLogsFilterComponent ]
})
export class AccessLogsFilterModule { }
