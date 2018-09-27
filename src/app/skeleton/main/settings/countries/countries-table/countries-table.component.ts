import {
  Component,
  Renderer2
}                                   from '@angular/core';

import { CustomTableComponent }     from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }       from '../../../../../services/data.binding.service';
import { CountriesRequestsService } from '../../../../../services/main/settings/countries-requests.service';

@Component( {
  selector: 'countries-table',
  templateUrl: './countries-table.component.html',
  styleUrls: [ './countries-table.component.scss' ]
} )
export class CountriesTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
                protected itemsService: CountriesRequestsService,
                protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
