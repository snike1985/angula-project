import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveEffectModule } from './active-effect.module';
import { DropEfectGlobalModule } from './drop-efect-global.module';
import { SelectcontrolModule } from '../controls/selectcontrol/selectcontrol.module';
import { KeysPipeModule } from './keys-pipe.module';
import { DatepickerControlModule } from '../controls/datepicker-control/datepicker-control.module';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    SelectcontrolModule,
    DatepickerControlModule,
    KeysPipeModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    SelectcontrolModule,
    KeysPipeModule,
    DatepickerControlModule
  ]
})
export class FilterModule { }
