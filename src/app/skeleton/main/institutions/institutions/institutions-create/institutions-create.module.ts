import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { InstitutionsCreateRoutingModule } from './institutions-create-routing.module';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';

import { InstitutionsCreateComponent } from './institutions-create.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerControlModule } from '../../../../../controls/datepicker-control/datepicker-control.module';

@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    SelectcontrolModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    DatepickerControlModule,
    InstitutionsCreateRoutingModule
  ],
  declarations: [
    InstitutionsCreateComponent
  ]
} )
export class InstitutionsCreateModule {
}
