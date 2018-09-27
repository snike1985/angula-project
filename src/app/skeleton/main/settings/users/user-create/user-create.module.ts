import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { ActiveEffectModule }      from '../../../../../modules/active-effect.module';
import { ReactiveFormsModule }     from '@angular/forms';
import { SelectcontrolModule }     from '../../../../../controls/selectcontrol/selectcontrol.module';
import { SwitchControlModule }     from '../../../../../controls/switch-control/switch-control.module';
import { DropEfectGlobalModule }   from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }  from 'ngx-perfect-scrollbar';

import { UserCreateComponent }     from './user-create.component';
import { UserCreateRoutingModule } from './user-create-routing.module';


@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    ReactiveFormsModule,
    SelectcontrolModule,
    SwitchControlModule,
    PerfectScrollbarModule,
    UserCreateRoutingModule
  ],
  declarations: [
    UserCreateComponent
  ],
  exports: [
    UserCreateComponent
  ]
} )
export class UserCreateModule {
}
