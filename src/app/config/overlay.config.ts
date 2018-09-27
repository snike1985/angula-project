import { UserResetPasswordComponent }  from '../skeleton/main/settings/users/user-reset-password/user-reset-password.component';
import { InstitutionsImportComponent } from '../skeleton/main/institutions/institutions-import/institutions-import.component';
import { DiscardComponent } from '../skeleton/discard/discard.component';
import { DeleteConfirmationComponent } from '../skeleton/delete-confirmation/delete-confirmation.component';
import { MerchantDeleteComponent } from '../skeleton/merchant-delete/merchant-delete.component';
import { LocationDeleteComponent } from '../skeleton/location-delete/location-delete.component';
import { DeviceDeleteComponent } from '../skeleton/device-delete/device-delete.component';
import { AuditLogSingleComponent } from '../skeleton/main/logs/audit-log/audit-log-single/audit-log-single.component';
import { AccessLogSingleComponent } from '../skeleton/main/logs/access-log/access-log-single/access-log-single.component';
import { TransactionLogSingleComponent } from '../skeleton/main/logs/transaction-log/transaction-log-single/transaction-log-single.component';
import { TransactionRowDataComponent } from '../skeleton/main/logs/transaction-log/transaction-row-data/transaction-row-data.component';
import { WorkflowNewComponent } from '../skeleton/main/routing/workflows/workflow-new/workflow-new.component';
import { WorkflowGroupNewComponent } from '../skeleton/main/routing/workflows/workflow-group-new/workflow-group-new.component';
import { WorkflowDeleteComponent } from '../skeleton/main/routing/workflows/workflow-delete/workflow-delete.component';
import { WorkflowGroupDeleteComponent } from '../skeleton/main/routing/workflows/workflow-group-delete/workflow-group-delete.component';
import { TransactionLogJsonComponent } from '../skeleton/main/logs/transaction-log/transaction-log-json/transaction-log-json.component';
import { TransactionLogXmlComponent } from '../skeleton/main/logs/transaction-log/transaction-log-xml/transaction-log-xml.component';

export const PopupsConfig: Object = {
  UserResetPasswordComponent:  UserResetPasswordComponent,
  InstitutionsImportComponent: InstitutionsImportComponent,
  DeleteConfirmationComponent: DeleteConfirmationComponent,
  MerchantDeleteComponent: MerchantDeleteComponent,
  LocationDeleteComponent: LocationDeleteComponent,
  DeviceDeleteComponent: DeviceDeleteComponent,
  DiscardComponent: DiscardComponent,
  WorkflowNewComponent: WorkflowNewComponent,
  WorkflowGroupNewComponent: WorkflowGroupNewComponent,
  WorkflowGroupDeleteComponent: WorkflowGroupDeleteComponent,
  WorkflowDeleteComponent: WorkflowDeleteComponent,
  AuditLogSingleComponent: AuditLogSingleComponent,
  AccessLogSingleComponent: AccessLogSingleComponent,
  TransactionLogSingleComponent: TransactionLogSingleComponent,
  TransactionRowDataComponent: TransactionRowDataComponent,
  TransactionLogJsonComponent: TransactionLogJsonComponent,
  TransactionLogXmlComponent: TransactionLogXmlComponent
};
