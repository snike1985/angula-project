import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';
import { VelocityLimitsInfoComponent }  from './velocity-limits-info.component';

const routes: Routes = [
  {
    path: '',
    component: VelocityLimitsInfoComponent
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class VelocityLimitsInfoRoutingModule { }
