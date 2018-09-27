import {
  Component,
  Renderer2
}                                       from '@angular/core';

import { CustomTableComponent }         from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }           from '../../../../../services/data.binding.service';
import { CountryStatesRequestsService } from '../../../../../services/main/settings/country-states-requests.service';

@Component({
  selector: 'country-states-table',
  templateUrl: './country-states-table.component.html',
  styleUrls: ['./country-states-table.component.scss']
})
export class CountryStatesTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
                protected itemsService: CountryStatesRequestsService,
                protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
