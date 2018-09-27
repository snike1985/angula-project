import { Component } from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { VelocityLimitsService } from '../../../../../services/main/routing/velocity-limits.service';
import { DatePipe } from '@angular/common';


@Component( {
  selector: 'velocity-limits-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class VelocityLimitsFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: VelocityLimitsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}
