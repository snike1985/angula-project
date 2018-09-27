import { NgModule } from '@angular/core';
import { VelocityLimitsCreateRoutingModule } from './velocity-limits-create-routing.module';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { CreateModule } from '../../../../../modules/create.module';

import { VelocityLimitsCreateComponent } from './velocity-limits-create.component';


@NgModule( {
  imports: [
    CreateModule,
    SelectcontrolModule,
    SwitchControlModule,
    VelocityLimitsCreateRoutingModule
  ],
  declarations: [
    VelocityLimitsCreateComponent
  ]
} )
export class VelocityLimitsCreateModule {
}
