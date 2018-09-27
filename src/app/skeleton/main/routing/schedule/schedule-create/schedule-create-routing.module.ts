import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ScheduleCreateComponent } from './schedule-create.component';


const routes: Routes = [
  {
    path: '',
    component: ScheduleCreateComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ScheduleCreateRoutingModule {
}
