import { NgModule }                  from '@angular/core';
import { CommonModule }              from '@angular/common';
import { ProfileRoutingModule }      from './profile-routing.module';

import { ProfileComponent }          from './profile.component';

import { ProfileService }            from '../../../services/main/profile/profile.service';
import { UserRolesRequestsService }  from '../../../services/main/settings/user-roles-requests.service';


@NgModule({
  imports: [
    CommonModule,
    ProfileRoutingModule
  ],
  declarations: [
    ProfileComponent
  ],
  providers: [
    ProfileService,
    UserRolesRequestsService
  ]
})
export class ProfileModule {
}
