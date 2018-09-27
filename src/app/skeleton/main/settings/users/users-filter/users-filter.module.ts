import { NgModule } from '@angular/core';
import { FilterModule } from '../../../../../modules/filter.module';

import { UsersFilterComponent } from './users-filter.component';


@NgModule( {
  imports: [
    FilterModule
  ],
  declarations: [
    UsersFilterComponent
  ],
  exports: [
    UsersFilterComponent
  ]
} )
export class UsersFilterModule {
}
