import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { SwitchControlComponent } from './switch-control.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    SwitchControlComponent
  ],
  exports: [
    SwitchControlComponent
  ]
})
export class SwitchControlModule { }
