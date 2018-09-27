import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { PerfectScrollbarModule }         from 'ngx-perfect-scrollbar';
import { InstitutionsTableModule }        from '../institutions-table/institutions-table.module';
import { InstitutionsSearchModule }       from '../institutions-search/institutions-search.module';
import { InstitutionsFilterModule }       from '../institutions-filter/institutions-filter.module';
import { InstitutionsInfoRoutingModule }  from './institutions-info-routing.module';

import { InstitutionsInfoComponent }      from './institutions-info.component';


@NgModule( {
  imports: [
    CommonModule,
    InstitutionsFilterModule,
    InstitutionsSearchModule,
    PerfectScrollbarModule,
    InstitutionsTableModule,
    InstitutionsInfoRoutingModule
  ],
  declarations: [
    InstitutionsInfoComponent
  ]
} )
export class InstitutionsInfoModule {}
