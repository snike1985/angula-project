import { NgModule }                       from '@angular/core';
import { CommonModule }                   from '@angular/common';
import { ActiveEffectModule }             from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule }          from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }         from 'ngx-perfect-scrollbar';
import { InstitutionSingleRoutingModule } from './institution-single-routing.module';

import { InstitutionSingleComponent }     from './institution-single.component';

@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    InstitutionSingleRoutingModule
  ],
  declarations: [ InstitutionSingleComponent ]
})
export class InstitutionSingleModule { }
