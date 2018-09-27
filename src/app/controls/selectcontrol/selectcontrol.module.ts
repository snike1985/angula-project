import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { DropEfectGlobalModule }   from '../../modules/drop-efect-global.module';

import { SelectControlComponent }  from './selectcontrol.component';

@NgModule({
  imports: [
    CommonModule,
    DropEfectGlobalModule
  ],
  declarations: [
    SelectControlComponent
  ],
  exports: [
    SelectControlComponent
  ]
})
export class SelectcontrolModule { }
