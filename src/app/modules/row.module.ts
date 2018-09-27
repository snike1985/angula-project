import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HighlightModule } from './highlight.module';
import { SwitchControlModule } from '../controls/switch-control/switch-control.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule,
    RouterModule
  ],
  exports: [
    CommonModule,
    ReactiveFormsModule,
    SwitchControlModule,
    HighlightModule,
    RouterModule
  ]
})
export class RowModule { }
