import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { DropEfectGlobalModule } from '../../modules/drop-efect-global.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SwitchControlModule } from '../switch-control/switch-control.module';
import { InstitutionsImportModule } from '../../skeleton/main/institutions/institutions-import/institutions-import.module';
import { DiscardModule } from '../../skeleton/discard/discard.module';
import { DeleteConfirmationModule } from '../../skeleton/delete-confirmation/delete-confirmation.module';
import { MerchantDeleteModule } from '../../skeleton/merchant-delete/merchant-delete.module';
import { LocationDeleteModule } from '../../skeleton/location-delete/location-delete.module';
import { DeviceDeleteComponent } from '../../skeleton/device-delete/device-delete.component';
import { DeviceDeleteModule } from '../../skeleton/device-delete/device-delete.module';
import { AuditLogSingleModule } from '../../skeleton/main/logs/audit-log/audit-log-single/audit-log-single.module';
import { AccessLogSingleModule } from '../../skeleton/main/logs/access-log/access-log-single/access-log-single.module';
import { TransactionRowDataModule } from '../../skeleton/main/logs/transaction-log/transaction-row-data/transaction-row-data.module';
import { TransactionLogSingleModule } from '../../skeleton/main/logs/transaction-log/transaction-log-single/transaction-log-single.module';
import { WorkflowNewModule } from '../../skeleton/main/routing/workflows/workflow-new/workflow-new.module';
import { WorkflowGroupNewModule } from '../../skeleton/main/routing/workflows/workflow-group-new/workflow-group-new.module';
import { WorkflowGroupDeleteModule } from '../../skeleton/main/routing/workflows/workflow-group-delete/workflow-group-delete.module';
import { WorkflowDeleteModule } from '../../skeleton/main/routing/workflows/workflow-delete/workflow-delete.module';
import { TransactionLogJsonModule } from '../../skeleton/main/logs/transaction-log/transaction-log-json/transaction-log-json.module';
import { TransactionLogXmlModule } from '../../skeleton/main/logs/transaction-log/transaction-log-xml/transaction-log-xml.module';

import { AuditLogSingleComponent } from '../../skeleton/main/logs/audit-log/audit-log-single/audit-log-single.component';
import { ComboDropdownComponent } from './combodropdown/combodropdown.component';
import { SimpleSearchDropdownComponent } from './simple-search-dropdown/simple-search-dropdown.component';
import { SimpleDropdownComponent } from './simpledropdown/simpledropdown.component';
import { OverlayComponent } from './overlay.component';
import { DatepickerRangeComponent } from './datepicker-range/datepicker-range.component';
import { DatepickerDefaultComponent } from './datepicker-default/datepicker-default.component';
import { TimepickerComponent } from './timepicker/timepicker.component';
import { UserResetPasswordComponent } from '../../skeleton/main/settings/users/user-reset-password/user-reset-password.component';
import { AddFunctionSearchComponent } from './add-function-search/add-function-search.component';
import { ComboMerchantOptionsComponent } from './combomerchantoptions/combomerchantoptions.component';
import { InstitutionsImportComponent } from '../../skeleton/main/institutions/institutions-import/institutions-import.component';
import { DiscardComponent } from '../../skeleton/discard/discard.component';
import { DeleteConfirmationComponent } from '../../skeleton/delete-confirmation/delete-confirmation.component';
import { MerchantDeleteComponent } from '../../skeleton/merchant-delete/merchant-delete.component';
import { LocationDeleteComponent } from '../../skeleton/location-delete/location-delete.component';
import { AccessLogSingleComponent } from '../../skeleton/main/logs/access-log/access-log-single/access-log-single.component';
import { TransactionRowDataComponent } from '../../skeleton/main/logs/transaction-log/transaction-row-data/transaction-row-data.component';
import { TransactionLogSingleComponent } from '../../skeleton/main/logs/transaction-log/transaction-log-single/transaction-log-single.component';
import { WorkflowNewComponent } from '../../skeleton/main/routing/workflows/workflow-new/workflow-new.component';
import { WorkflowGroupNewComponent } from '../../skeleton/main/routing/workflows/workflow-group-new/workflow-group-new.component';
import { WorkflowGroupDeleteComponent } from '../../skeleton/main/routing/workflows/workflow-group-delete/workflow-group-delete.component';
import { WorkflowDeleteComponent } from '../../skeleton/main/routing/workflows/workflow-delete/workflow-delete.component';
import { AmountDropdownComponent } from './amountdropdown/amountdropdown.component';
import { TransactionLogJsonComponent } from '../../skeleton/main/logs/transaction-log/transaction-log-json/transaction-log-json.component';
import { TransactionLogXmlComponent } from '../../skeleton/main/logs/transaction-log/transaction-log-xml/transaction-log-xml.component';

import { DropdownDirective } from '../../directives/dropdown.directive';
import { PopupDirective } from '../../directives/popup.directive';

import { HighlightPipe } from '../../pipes/hihglight.pipe';


@NgModule( {
  imports: [
    CommonModule,
    PerfectScrollbarModule,
    DropEfectGlobalModule,
    ReactiveFormsModule,
    SwitchControlModule,
    InstitutionsImportModule,
    DiscardModule,
    DeleteConfirmationModule,
    MerchantDeleteModule,
    LocationDeleteModule,
    DeviceDeleteModule,
    AuditLogSingleModule,
    AccessLogSingleModule,
    TransactionRowDataModule,
    TransactionLogSingleModule,
    WorkflowNewModule,
    WorkflowGroupNewModule,
    WorkflowGroupDeleteModule,
    WorkflowDeleteModule,
    TransactionLogJsonModule,
    TransactionLogXmlModule
  ],
  declarations: [
    AddFunctionSearchComponent,
    ComboDropdownComponent,
    ComboMerchantOptionsComponent,
    DatepickerDefaultComponent,
    DatepickerRangeComponent,
    OverlayComponent,
    SimpleDropdownComponent,
    SimpleSearchDropdownComponent,
    TimepickerComponent,
    UserResetPasswordComponent,
    AmountDropdownComponent,

    PopupDirective,
    DropdownDirective,

    HighlightPipe
  ],
  entryComponents: [
    AddFunctionSearchComponent,
    SimpleDropdownComponent,
    SimpleSearchDropdownComponent,
    UserResetPasswordComponent,
    ComboDropdownComponent,
    DatepickerRangeComponent,
    DatepickerDefaultComponent,
    InstitutionsImportComponent,
    DeleteConfirmationComponent,
    MerchantDeleteComponent,
    LocationDeleteComponent,
    DiscardComponent,
    DeviceDeleteComponent,
    ComboMerchantOptionsComponent,
    AuditLogSingleComponent,
    AccessLogSingleComponent,
    TransactionRowDataComponent,
    TransactionLogSingleComponent,
    WorkflowNewComponent,
    WorkflowGroupNewComponent,
    WorkflowGroupDeleteComponent,
    WorkflowDeleteComponent,
    AmountDropdownComponent,
    TransactionLogJsonComponent,
    TransactionLogXmlComponent
  ],
  exports: [
    OverlayComponent
  ]
} )
export class
OverlayModule {
}
