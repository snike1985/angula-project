import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { DataBindingService } from '../../../../../services/data.binding.service';


@Component( {
  selector: 'transaction-logs-table',
  templateUrl: './transaction-logs-table.component.html',
  styleUrls: [ './transaction-logs-table.component.scss' ]
} )
export class TransactionLogsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: TransactionLogsService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}