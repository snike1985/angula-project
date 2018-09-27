import { Component }                  from '@angular/core';

import { RowStatusChangeComponent }   from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }         from '../../../../../services/data.binding.service';
import { NotificationService }        from '../../../../../services/notification.service';
import { CurrenciesRequestsService }  from '../../../../../services/main/settings/currencies-requests.service';

@Component({
  selector: 'currency-row',
  templateUrl: './currency-row.component.html',
  styleUrls: ['./currency-row.component.scss']
})
export class CurrencyRowComponent extends RowStatusChangeComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: CurrenciesRequestsService,
               protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }

}
