import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { LocationSingleRoutingModule } from './location-single-routing.module';

import { LocationSingleComponent } from './location-single.component';


@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    LocationSingleRoutingModule
  ],
  declarations: [ LocationSingleComponent ]
} )
export class LocationSingleModule {
}
