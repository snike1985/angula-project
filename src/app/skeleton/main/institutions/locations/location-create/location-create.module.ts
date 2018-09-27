import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { ReactiveFormsModule } from '@angular/forms';
import { DatepickerControlModule } from '../../../../../controls/datepicker-control/datepicker-control.module';
import { LocationCreateRoutingModule } from './location-create-routing.module';

import { LocationCreateComponent } from './location-create.component';
import { GMapsService } from '../../../../../services/main/institutions/locations-geocoding.service';
import { AgmCoreModule } from '@agm/core';


@NgModule({
  imports: [
    CommonModule,
    ActiveEffectModule,
    SelectcontrolModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    ReactiveFormsModule,
    DatepickerControlModule,
    LocationCreateRoutingModule,
    AgmCoreModule
  ],
  declarations: [LocationCreateComponent],
  providers: [ GMapsService ]
})
export class LocationCreateModule { }
