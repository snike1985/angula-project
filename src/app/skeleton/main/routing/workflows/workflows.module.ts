import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { WorkflowsRoutingModule } from './workflows-routing.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { WorkflowGroupModule } from './workflow-group/workflow-group.module';

import { WorkflowsComponent }     from './workflows.component';
import { ActiveEffectModule } from '../../../../modules/active-effect.module';


@NgModule({
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    WorkflowGroupModule,
    ActiveEffectModule,
    WorkflowsRoutingModule
  ],
  declarations: [
    WorkflowsComponent
  ]
})
export class WorkflowsModule { }
