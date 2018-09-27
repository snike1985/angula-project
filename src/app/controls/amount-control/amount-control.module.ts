import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DropEfectGlobalModule } from '../../modules/drop-efect-global.module';
import { AmountControlComponent } from './amount-control.component';

@NgModule({
  imports: [
    CommonModule,
    DropEfectGlobalModule
  ],
  declarations: [
    AmountControlComponent
  ],
  exports: [
    AmountControlComponent
  ]
})
export class AmountControlModule { }
