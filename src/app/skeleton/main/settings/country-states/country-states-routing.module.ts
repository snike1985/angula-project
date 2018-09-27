import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { CountryStatesComponent } from './country-states.component';


const routes: Routes = [
  {
    path: '',
    component: CountryStatesComponent,
    pathMatch: 'full'
  }
];

@NgModule( {
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
} )
export class CountryStatesRoutingModule {
}
