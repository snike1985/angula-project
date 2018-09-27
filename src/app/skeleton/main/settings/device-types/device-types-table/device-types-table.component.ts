import {
  Component,
  Renderer2
}                                from '@angular/core';

import { CustomTableComponent }  from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }    from '../../../../../services/data.binding.service';
import { DeviceTypesRequestsService } from '../../../../../services/main/settings/device-types-requests.service';


@Component({
  selector: 'device-types-table',
  templateUrl: './device-types-table.component.html',
  styleUrls: ['./device-types-table.component.scss']
})
export class DeviceTypesTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
                protected itemsService: DeviceTypesRequestsService,
                protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
