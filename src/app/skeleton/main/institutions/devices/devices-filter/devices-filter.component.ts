import { Component } from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { DevicesRequestsService } from '../../../../../services/main/institutions/devices-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { DatePipe } from '@angular/common';

@Component( {
  selector: 'devices-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class DevicesFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: DevicesRequestsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}

