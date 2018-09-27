import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { ActiveEffectModule }         from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule }      from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';
import { DevicesSingleRoutingModule } from './devices-single-routing.module';

import { DevicesSingleComponent }     from './devices-single.component';

@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    DevicesSingleRoutingModule
  ],
  declarations: [ DevicesSingleComponent ]
})
export class DevicesSingleModule { }
