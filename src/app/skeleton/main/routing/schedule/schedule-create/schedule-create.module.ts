import { NgModule } from '@angular/core';
import { ScheduleCreateRoutingModule } from './schedule-create-routing.module';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';

import { ScheduleCreateComponent } from './schedule-create.component';
import { CreateModule } from '../../../../../modules/create.module';


@NgModule( {
  imports: [
    CreateModule,
    SelectcontrolModule,
    SwitchControlModule,
    ScheduleCreateRoutingModule
  ],
  declarations: [
    ScheduleCreateComponent
  ]
} )
export class ScheduleCreateModule {
}
