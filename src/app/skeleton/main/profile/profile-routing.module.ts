import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { ProfileComponent }             from './profile.component';

const routes: Routes = [
    {
      path: '',
      component: ProfileComponent,
      children: [
        {
          path: '',
          loadChildren: './profile-info/profile-info.module#ProfileInfoModule'
        },
        {
          path: 'change-password',
          loadChildren: './password-profile/password-profile.module#PasswordProfileModule'
        },
        {
          path: 'edit',
          loadChildren: './edit-profile/edit-profile.module#EditProfileModule'
        }
      ]
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
