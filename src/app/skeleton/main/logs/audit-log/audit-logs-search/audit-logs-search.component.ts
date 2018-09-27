import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAuditRequestsService } from '../../../../../services/main/logs/logs-audit.service';

import { FlyInOut } from '../../../../../config/animations.config';


@Component( {
  selector: 'audit-logs-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class AuditLogsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAuditRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
