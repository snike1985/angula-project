import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowComponent } from './workflow.component';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { WorkflowServiceModule } from '../workflow-service/workflow-service.module';

@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    ReactiveFormsModule,
    SwitchControlModule,
    WorkflowServiceModule
  ],
  declarations: [
    WorkflowComponent
  ],
  exports: [
    WorkflowComponent
  ]
} )
export class WorkflowModule {
}
