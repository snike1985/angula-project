import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { TransactionLogComponent } from './transaction-log.component';


const routes: Routes = [
  {
    path: '',
    component: TransactionLogComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class TransactionsLogsRoutingModule {
}
