import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DiscardComponent } from './discard.component';

@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    DiscardComponent
  ],
  exports: [
    DiscardComponent
  ]
} )
export class DiscardModule {
}
