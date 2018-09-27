import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { DataBindingService } from '../../../../../services/data.binding.service';

import { FlyInOut } from '../../../../../config/animations.config';


@Component( {
  selector: 'transaction-logs-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class TransactionLogsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: TransactionLogsService ) {

    super( dataBindingService, itemsService );

  }

}
