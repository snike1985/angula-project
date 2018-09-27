import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { DevicesCreateRoutingModule } from './devices-create-routing.module';
import { ActiveEffectModule }         from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule }      from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }     from 'ngx-perfect-scrollbar';
import { SelectcontrolModule }        from '../../../../../controls/selectcontrol/selectcontrol.module';
import { DatepickerControlModule } from '../../../../../controls/datepicker-control/datepicker-control.module';
import { ReactiveFormsModule } from '@angular/forms';

import { DevicesCreateComponent }     from './devices-create.component';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    SelectcontrolModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    DatepickerControlModule,
    DevicesCreateRoutingModule
  ],
  declarations: [ DevicesCreateComponent ]
})
export class DevicesCreateModule { }
