import { NgModule }         from '@angular/core';
import { CommonModule }     from '@angular/common';
import { TimeModule }       from '../../modules/time.module';

import { FooterComponent }  from './footer.component';

@NgModule({
  imports: [
    CommonModule,
    TimeModule
  ],
  declarations: [
    FooterComponent
  ],
  exports: [
    FooterComponent
  ]
})
export class FooterModule { }
