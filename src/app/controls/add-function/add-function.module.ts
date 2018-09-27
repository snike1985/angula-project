import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddFunctionComponent } from './add-function.component';
import { DropEfectGlobalModule } from '../../modules/drop-efect-global.module';

@NgModule({
  imports: [
    CommonModule,
    DropEfectGlobalModule
  ],
  declarations: [
    AddFunctionComponent
  ],
  exports: [
    AddFunctionComponent
  ]
})
export class AddFunctionModule { }
