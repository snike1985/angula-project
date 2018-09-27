import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { MerchantsInfoComponent } from './merchants-info.component';


const routes: Routes = [
  {
    path: '',
    component: MerchantsInfoComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MerchantsInfoRoutingModule {
}
