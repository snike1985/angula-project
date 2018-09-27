import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkflowGroupNewComponent } from './workflow-group-new.component';
import { PaymentMethodsService } from '../../../../../services/payment-methods.service';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchControlModule } from '../../../../../controls/switch-control/switch-control.module';
import { ActiveEffectModule } from '../../../../../modules/active-effect.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

@NgModule( {
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActiveEffectModule,
    SwitchControlModule,
    PerfectScrollbarModule
  ],
  declarations: [
    WorkflowGroupNewComponent
  ],
  providers: [
    PaymentMethodsService
  ]
} )
export class WorkflowGroupNewModule {
}
