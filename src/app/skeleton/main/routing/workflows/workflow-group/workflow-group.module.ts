import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowGroupComponent } from './workflow-group.component';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { WorkflowModule } from '../workflow/workflow.module';

@NgModule( {
  imports: [
    CommonModule,
    ActiveEffectModule,
    ReactiveFormsModule,
    SwitchControlModule,
    WorkflowModule
  ],
  declarations: [
    WorkflowGroupComponent
  ],
  exports: [
    WorkflowGroupComponent
  ]
} )
export class WorkflowGroupModule {
}
