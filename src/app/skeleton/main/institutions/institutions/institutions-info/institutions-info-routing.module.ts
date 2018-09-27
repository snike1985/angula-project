import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';

import { InstitutionsInfoComponent } from './institutions-info.component';

const routes: Routes = [
  {
    path: '',
    component: InstitutionsInfoComponent,
    pathMatch: 'full'
  }
];


@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class InstitutionsInfoRoutingModule {
}
