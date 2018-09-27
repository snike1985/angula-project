import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowServiceComponent } from './workflow-service.component';
import { SelectcontrolModule } from '../../../../../controls/selectcontrol/selectcontrol.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';

@NgModule( {
  imports: [
    CommonModule,
    SelectcontrolModule,
    ReactiveFormsModule,
    SwitchControlModule
  ],
  declarations: [
    WorkflowServiceComponent
  ],
  exports: [
    WorkflowServiceComponent
  ]
} )
export class WorkflowServiceModule {
}
