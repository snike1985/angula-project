import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { PerfectScrollbarModule }       from 'ngx-perfect-scrollbar';
import { ActiveEffectModule }           from '../../../../../modules/active-effect.module';
import { MerchantSingleRoutingModule } from './merchant-single-routing.module';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';

import { MerchantSingleComponent } from './merchant-single.component';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    MerchantSingleRoutingModule
  ],
  declarations: [ MerchantSingleComponent ]
})
export class MerchantSingleModule { }
