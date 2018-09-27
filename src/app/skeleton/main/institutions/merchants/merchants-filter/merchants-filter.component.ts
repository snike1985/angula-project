import { Component } from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';
import { DatePipe } from '@angular/common';

@Component( {
  selector: 'merchants-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class MerchantsFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: MerchantsRequestsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}
