import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEffectModule } from './active-effect.module';
import { DropEfectGlobalModule } from './drop-efect-global.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    ReactiveFormsModule
  ]
})
export class CreateModule { }
