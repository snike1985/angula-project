import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAuditRequestsService } from '../../../../../services/main/logs/logs-audit.service';


@Component({
  selector: 'audit-logs-table',
  templateUrl: './audit-logs-table.component.html',
  styleUrls: ['./audit-logs-table.component.scss']
})
export class AuditLogsTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAuditRequestsService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
