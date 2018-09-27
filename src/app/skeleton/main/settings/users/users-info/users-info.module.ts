import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { UsersInfoRoutingModule }  from './users-info-routing.module';

import { UsersInfoComponent }      from './users-info.component';
import { UsersFilterModule } from '../users-filter/users-filter.module';
import { UsersSearchModule } from '../users-search/users-search.module';
import { UsersTableModule } from '../users-table/users-table.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule( {
  imports: [
    CommonModule,
    UsersFilterModule,
    UsersSearchModule,
    PerfectScrollbarModule,
    UsersTableModule,
    UsersInfoRoutingModule
  ],
  declarations: [
    UsersInfoComponent
  ]
} )
export class UsersInfoModule {
}
