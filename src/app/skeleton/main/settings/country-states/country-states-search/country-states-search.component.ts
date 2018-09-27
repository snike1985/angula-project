import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { CountryStatesRequestsService } from '../../../../../services/main/settings/country-states-requests.service';

import { FlyInOut } from '../../../../../config/animations.config';

@Component({
  selector: 'country-states-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class CountryStatesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: CountryStatesRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
