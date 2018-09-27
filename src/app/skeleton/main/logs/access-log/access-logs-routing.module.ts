import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { AccessLogComponent } from './access-log.component';


const routes: Routes = [
  {
    path: '',
    component: AccessLogComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class AccessLogsRoutingModule {
}
