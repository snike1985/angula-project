import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { SwitchControlModule }   from '../../../../../controls/switch-control/switch-control.module';
import { FunctionsModule }       from '../../functions/functions.module';
import { HighlightModule }       from '../../../../../modules/highlight.module';

import { UserRoleRowComponent }  from './user-role-row.component';
import { RouterModule }          from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    FunctionsModule,
    HighlightModule,
    RouterModule
  ],
  declarations: [
    UserRoleRowComponent
  ],
  exports: [
    UserRoleRowComponent
  ]
})
export class UserRoleRowModule { }
