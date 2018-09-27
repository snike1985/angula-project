import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ActiveEffectModule }       from '../../../../modules/active-effect.module';
import { PerfectScrollbarModule }   from 'ngx-perfect-scrollbar';

import { ProfileInfoComponent }     from './profile-info.component';

import { ProfileInfoRoutingModule } from './profile-info-routing.module';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    PerfectScrollbarModule,
    ProfileInfoRoutingModule
  ],
  declarations: [
    ProfileInfoComponent
  ]
})
export class ProfileInfoModule { }
