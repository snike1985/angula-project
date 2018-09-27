import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InstitutionsRoutingModule } from './institutions-routing.module';

import { InstitutionsComponent } from './institutions.component';


@NgModule( {
  imports: [
    CommonModule,
    InstitutionsRoutingModule
  ],
  declarations: [ InstitutionsComponent ]
} )
export class InstitutionsModule {
}
