import { Component, Renderer2 }         from '@angular/core';

import { CustomTableComponent }         from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }           from '../../../../../services/data.binding.service';
import { InstitutionsRequestsService }  from '../../../../../services/main/institutions/institutions-requests.service';

@Component({
  selector: 'institutions-table',
  templateUrl: './institutions-table.component.html',
  styleUrls: ['./institutions-table.component.scss']
})
export class InstitutionsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: InstitutionsRequestsService,
               protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
