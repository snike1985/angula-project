import { Component }                from '@angular/core';

import { SearchComponent }          from '../../../../search/search.component';

import { CountriesRequestsService } from '../../../../../services/main/settings/countries-requests.service';
import { DataBindingService }       from '../../../../../services/data.binding.service';

import { FlyInOut }                 from '../../../../../config/animations.config';

@Component({
  selector: 'countries-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: ['../../../../search/search.component.scss'],
  animations: [ FlyInOut ]
})
export class CountriesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: CountriesRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
