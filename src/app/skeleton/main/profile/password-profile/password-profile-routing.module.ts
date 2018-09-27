import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { PasswordProfileComponent }     from './password-profile.component';

const routes: Routes = [
    {
        path: '',
        component: PasswordProfileComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordProfileRoutingModule { }
