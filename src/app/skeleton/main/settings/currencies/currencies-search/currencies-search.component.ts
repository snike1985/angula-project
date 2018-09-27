import { Component }                  from '@angular/core';

import { SearchComponent }            from '../../../../search/search.component';

import { CurrenciesRequestsService }  from '../../../../../services/main/settings/currencies-requests.service';
import { DataBindingService }         from '../../../../../services/data.binding.service';

import { FlyInOut }                   from '../../../../../config/animations.config';

@Component({
  selector: 'currencies-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: ['../../../../search/search.component.scss'],
  animations: [ FlyInOut ]
})
export class CurrenciesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: CurrenciesRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
