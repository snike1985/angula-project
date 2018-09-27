import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';

import { ViewingSettingsComponent } from './viewing-settings.component';

const routes: Routes = [
  {
    path: '',
    component: ViewingSettingsComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ViewingSettingsRoutingModule { }
