import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { DeviceTypesSearchComponent } from './device-types-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    DeviceTypesSearchComponent
  ],
  exports: [
    DeviceTypesSearchComponent
  ]
})
export class DeviceTypesSearchModule { }
