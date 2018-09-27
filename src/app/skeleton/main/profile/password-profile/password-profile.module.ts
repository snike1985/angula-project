import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { ReactiveFormsModule }            from '@angular/forms';
import { ActiveEffectModule }             from '../../../../modules/active-effect.module';
import { PasswordProfileRoutingModule }   from './password-profile-routing.module';
import { DropEfectGlobalModule }          from '../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }         from 'ngx-perfect-scrollbar';

import { PasswordProfileComponent }       from './password-profile.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    PasswordProfileRoutingModule
  ],
  declarations: [
    PasswordProfileComponent
  ]
})
export class PasswordProfileModule { }
