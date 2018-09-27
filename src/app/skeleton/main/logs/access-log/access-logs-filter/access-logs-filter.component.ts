import { Component } from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAccessRequestsService } from '../../../../../services/main/logs/logs-access.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { DatePipe } from '@angular/common';


@Component( {
  selector: 'access-logs-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class AccessLogsFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAccessRequestsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}
