import { Component } from '@angular/core';
import { FilterComponent } from '../../../../filter-table/filter/filter.component';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';
import { DatePipe } from '@angular/common';

@Component( {
  selector: 'user-roles-filter',
  templateUrl: '../../../../filter-table/filter/filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class UserRolesFilterComponent extends FilterComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: UserRolesRequestsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }

}