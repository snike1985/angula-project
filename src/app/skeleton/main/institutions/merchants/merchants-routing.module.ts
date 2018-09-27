import { NgModule }                   from '@angular/core';
import { Routes, RouterModule }       from '@angular/router';

import { MerchantsComponent }         from './merchants.component';


const routes: Routes = [
  {
    path: '',
    component: MerchantsComponent,
    children: [
      {
        path: '',
        loadChildren: './merchants-info/merchants-info.module#MerchantsInfoModule',
      },
      {
        path: 'create',
        loadChildren: './merchants-create/merchants-create.module#MerchantsCreateModule'
      },
      {
        path: ':id/edit',
        loadChildren: './merchants-create/merchants-create.module#MerchantsCreateModule'
      },
      {
        path: ':id',
        loadChildren: './merchant-single/merchant-single.module#MerchantSingleModule'
      }
    ]
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class MerchantsRoutingModule {
}
