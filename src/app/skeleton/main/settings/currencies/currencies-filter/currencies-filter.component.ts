import { Component } from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { CurrenciesRequestsService } from '../../../../../services/main/settings/currencies-requests.service';
import { DatePipe } from '@angular/common';

@Component( {
  selector: 'currencies-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class CurrenciesFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: CurrenciesRequestsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}
