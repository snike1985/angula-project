import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { UserRolesFilterComponent } from './user-roles-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    UserRolesFilterComponent
  ],
  exports: [
    UserRolesFilterComponent
  ]
} )
export class UserRolesFilterModule {
}
