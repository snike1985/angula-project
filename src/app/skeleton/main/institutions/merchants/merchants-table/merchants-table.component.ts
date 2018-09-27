import { Component, Renderer2 }      from '@angular/core';

import { CustomTableComponent }      from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }        from '../../../../../services/data.binding.service';
import { MerchantsRequestsService }  from '../../../../../services/main/institutions/merchants-requests.service';

@Component({
  selector: 'merchants-table',
  templateUrl: './merchants-table.component.html',
  styleUrls: ['./merchants-table.component.scss']
})

export class MerchantsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: MerchantsRequestsService,
               protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
