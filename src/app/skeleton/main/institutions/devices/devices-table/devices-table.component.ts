import { Component, Renderer2 }       from '@angular/core';

import { CustomTableComponent }       from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }         from '../../../../../services/data.binding.service';
import { DevicesRequestsService }     from '../../../../../services/main/institutions/devices-requests.service';

@Component({
  selector: 'devices-table',
  templateUrl: './devices-table.component.html',
  styleUrls: ['./devices-table.component.scss']
})
export class DevicesTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: DevicesRequestsService,
               protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
