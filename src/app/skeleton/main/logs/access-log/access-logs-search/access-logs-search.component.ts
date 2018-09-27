import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAccessRequestsService } from '../../../../../services/main/logs/logs-access.service';

import { FlyInOut } from '../../../../../config/animations.config';


@Component( {
  selector: 'access-logs-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class AccessLogsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAccessRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
