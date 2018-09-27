import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { VelocityLimitsCreateComponent } from './velocity-limits-create.component';


const routes: Routes = [
  {
    path: '',
    component: VelocityLimitsCreateComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class VelocityLimitsCreateRoutingModule {
}
