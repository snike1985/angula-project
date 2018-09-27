import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { ScheduleComponent } from './schedule.component';

const routes: Routes = [
  {
    path: '',
    component: ScheduleComponent,
    children: [
      {
        path: '',
        loadChildren: './schedule-info/schedule-info.module#ScheduleInfoModule',
      },
      {
        path: 'create',
        loadChildren: './schedule-create/schedule-create.module#ScheduleCreateModule',
      },
      {
        path: ':id/edit',
        loadChildren: './schedule-create/schedule-create.module#ScheduleCreateModule',
      }
    ]
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class ScheduleRoutingModule {
}
