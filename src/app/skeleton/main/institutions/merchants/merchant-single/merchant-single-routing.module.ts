import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { MerchantSingleComponent } from './merchant-single.component';

const routes: Routes = [
  {
    path: '',
    component: MerchantSingleComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MerchantSingleRoutingModule {
}
