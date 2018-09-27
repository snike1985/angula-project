import { Component }                from '@angular/core';

import { RowStatusChangeComponent } from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }       from '../../../../../services/data.binding.service';
import { NotificationService }      from '../../../../../services/notification.service';
import { CountriesRequestsService } from '../../../../../services/main/settings/countries-requests.service';

@Component({
  selector: 'country-row',
  templateUrl: './country-row.component.html',
  styleUrls: ['./country-row.component.scss']
})
export class CountryRowComponent extends RowStatusChangeComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: CountriesRequestsService,
               protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }

}
