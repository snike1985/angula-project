import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { ActiveEffectModule }            from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule }         from '../../../../../modules/drop-efect-global.module';
import { ReactiveFormsModule }           from '@angular/forms';
import { SelectcontrolModule }           from '../../../../../controls/selectcontrol/selectcontrol.module';
import { SwitchControlModule }           from '../../../../../controls/switch-control/switch-control.module';
import { PerfectScrollbarModule }        from 'ngx-perfect-scrollbar';
import { UserRolesCreateRoutingModule }  from './user-roles-create-routing.module';
import { PermissionControlModule }       from '../../../../../controls/permission-control/permission-control.module';

import { UserRolesCreateComponent }      from './user-roles-create.component';
import { AddFunctionComponent } from '../../../../../controls/add-function/add-function.component';
import { AddFunctionModule } from '../../../../../controls/add-function/add-function.module';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    ReactiveFormsModule,
    SelectcontrolModule,
    SwitchControlModule,
    PerfectScrollbarModule,
    UserRolesCreateRoutingModule,
    PermissionControlModule,
    AddFunctionModule
  ],
  declarations: [
    UserRolesCreateComponent
  ],
  exports: [
    UserRolesCreateComponent
  ]
})
export class UserRolesCreateModule { }
