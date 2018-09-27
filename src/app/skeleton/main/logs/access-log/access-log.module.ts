import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { AccessLogsRoutingModule }  from './access-logs-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { AccessLogsTableModule } from './access-logs-table/access-logs-table.module';
import { AccessLogsFilterModule } from './access-logs-filter/access-logs-filter.module';
import { AccessLogsSearchModule } from './access-logs-search/access-logs-search.module';

import { AccessLogComponent }       from './access-log.component';


@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    AccessLogsTableModule,
    AccessLogsFilterModule,
    AccessLogsSearchModule,
    AccessLogsRoutingModule
  ],
  declarations: [ AccessLogComponent ]
})
export class AccessLogModule { }
