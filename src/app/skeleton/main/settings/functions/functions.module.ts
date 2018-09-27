import { NgModule }            from '@angular/core';
import { CommonModule }        from '@angular/common';
import { ActiveEffectModule }  from '../../../../modules/active-effect.module';

import { FunctionsComponent }  from './functions.component';

@NgModule({
  declarations: [
    FunctionsComponent
  ],
  exports: [
    FunctionsComponent
  ],
  imports: [
    ActiveEffectModule,
    CommonModule
  ]
})
export class FunctionsModule { }
