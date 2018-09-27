import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { MerchantsCreateComponent } from './merchants-create.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantsCreateComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MerchantsCreateRoutingModule {
}
