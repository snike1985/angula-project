import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ScheduleInfoComponent } from './schedule-info.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleInfoComponent
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ScheduleInfoRoutingModule {
}
