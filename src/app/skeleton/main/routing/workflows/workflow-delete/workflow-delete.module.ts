import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkflowDeleteComponent } from './workflow-delete.component';


@NgModule( {
  imports: [
    CommonModule
  ],
  declarations: [
    WorkflowDeleteComponent
  ],
  exports: [
    WorkflowDeleteComponent
  ]
} )
export class WorkflowDeleteModule {
}
