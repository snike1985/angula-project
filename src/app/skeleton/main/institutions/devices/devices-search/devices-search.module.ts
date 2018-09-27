import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { ReactiveFormsModule }    from '@angular/forms';

import { DevicesSearchComponent } from './devices-search.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DevicesSearchComponent
  ],
  exports: [
    DevicesSearchComponent
  ]
})
export class DevicesSearchModule { }
