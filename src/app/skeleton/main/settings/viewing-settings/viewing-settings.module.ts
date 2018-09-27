import { NgModule }                      from '@angular/core';
import { CommonModule }                  from '@angular/common';
import { ReactiveFormsModule }           from '@angular/forms';
import { DropEfectGlobalModule }         from '../../../../modules/drop-efect-global.module';
import { ViewingSettingsRoutingModule }  from './viewing-settings-routing.module';
import { SelectcontrolModule }           from '../../../../controls/selectcontrol/selectcontrol.module';
import { PerfectScrollbarModule }        from 'ngx-perfect-scrollbar';

import { ViewingSettingsComponent }      from './viewing-settings.component';
import { DatepickerControlModule }       from '../../../../controls/datepicker-control/datepicker-control.module';


@NgModule({
  imports: [
    CommonModule,
    SelectcontrolModule,
    ReactiveFormsModule,
    DropEfectGlobalModule,
    ViewingSettingsRoutingModule,
    PerfectScrollbarModule,
    DatepickerControlModule
  ],
  declarations: [
    ViewingSettingsComponent
  ]

})
export class ViewingSettingsModule { }
