import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { MerchantsCreateRoutingModule } from './merchants-create-routing.module';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';
import { DatepickerControlModule } from '../../../../../controls/datepicker-control/datepicker-control.module';
import { ReactiveFormsModule } from '@angular/forms';

import { MerchantsCreateComponent } from './merchants-create.component';


@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    SelectcontrolModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    SwitchControlModule,
    ReactiveFormsModule,
    DatepickerControlModule,
    MerchantsCreateRoutingModule
  ],
  declarations: [ MerchantsCreateComponent ]
} )
export class MerchantsCreateModule {
}
