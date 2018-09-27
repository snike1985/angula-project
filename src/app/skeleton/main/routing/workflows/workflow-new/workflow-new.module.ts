import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowNewComponent } from './workflow-new.component';
import { AddFunctionComponent } from '../../../../../controls/add-function/add-function.component';
import { DropEfectGlobalModule } from '../../../../../modules/drop-efect-global.module';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { ReactiveFormsModule } from '@angular/forms';
import { WorkflowServiceModule } from '../workflow-service/workflow-service.module';
import { AddFunctionModule } from '../../../../../controls/add-function/add-function.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule( {
  imports: [
    CommonModule,
    DropEfectGlobalModule,
    ActiveEffectModule,
    SwitchControlModule,
    ReactiveFormsModule,
    WorkflowServiceModule,
    PerfectScrollbarModule,
    AddFunctionModule
  ],
  declarations: [
    WorkflowNewComponent
  ]
} )
export class WorkflowNewModule {
}
