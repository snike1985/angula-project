import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { PermissionControlComponent } from './permission-control.component';
import { SwitchControlModule }        from '../switch-control/switch-control.module';
import { ActiveEffectModule }         from '../../modules/active-effect.module';
import { ReactiveFormsModule }        from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    SwitchControlModule,
    ActiveEffectModule,
    ReactiveFormsModule
  ],
  declarations: [
    PermissionControlComponent,
  ],
  exports: [
    PermissionControlComponent
  ]
})
export class PermissionControlModule { }
