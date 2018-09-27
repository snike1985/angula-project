import { NgModule }             from '@angular/core';
import { CommonModule }         from '@angular/common';
import { FooterModule }         from '../footer/footer.module';

import { ErrorsComponent }      from './errors.component';

import { ErrorsRoutingModule }  from './errors-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FooterModule,
    ErrorsRoutingModule
  ],
  declarations: [
    ErrorsComponent
  ]
})
export class ErrorsModule { }
