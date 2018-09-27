import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowGroupDeleteComponent } from './workflow-group-delete.component';


@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    WorkflowGroupDeleteComponent
  ],
  exports: [
    WorkflowGroupDeleteComponent
  ]
} )
export class WorkflowGroupDeleteModule {
}
