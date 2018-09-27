import { Component }                  from '@angular/core';

import { RowStatusChangeComponent }   from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }         from '../../../../../services/data.binding.service';
import { NotificationService }        from '../../../../../services/notification.service';
import { DeviceTypesRequestsService } from '../../../../../services/main/settings/device-types-requests.service';

@Component({
  selector: 'device-types-row',
  templateUrl: './device-types-row.component.html',
  styleUrls: ['./device-types-row.component.scss']
})
export class DeviceTypesRowComponent extends RowStatusChangeComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected deviceTypesServices: DeviceTypesRequestsService,
               protected notification: NotificationService ) {

    super( dataBindingService, deviceTypesServices, notification );

  }

}
