import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAccessRequestsService } from '../../../../../services/main/logs/logs-access.service';


@Component( {
  selector: 'access-logs-table',
  templateUrl: './access-logs-table.component.html',
  styleUrls: [ './access-logs-table.component.scss' ]
} )
export class AccessLogsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAccessRequestsService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
