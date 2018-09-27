import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { ReactiveFormsModule }  from '@angular/forms';
import { SwitchControlModule }  from '../../../../../controls/switch-control/switch-control.module';
import { HighlightModule }      from '../../../../../modules/highlight.module';
import { RouterModule }         from '@angular/router';

import { UserRowComponent }     from './user-row.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule,
    RouterModule
  ],
  declarations: [
    UserRowComponent
  ],
  exports: [
    UserRowComponent
  ]
})
export class UserRowModule { }
