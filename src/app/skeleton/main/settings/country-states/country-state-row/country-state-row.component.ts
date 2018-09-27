import { Component }                    from '@angular/core';

import { RowStatusChangeComponent }     from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }           from '../../../../../services/data.binding.service';
import { NotificationService }          from '../../../../../services/notification.service';
import { CountryStatesRequestsService } from '../../../../../services/main/settings/country-states-requests.service';

@Component({
  selector: 'country-state-row',
  templateUrl: './country-state-row.component.html',
  styleUrls: ['./country-state-row.component.scss']
})
export class CountryStateRowComponent extends RowStatusChangeComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: CountryStatesRequestsService,
               protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }

}
