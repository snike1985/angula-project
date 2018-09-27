import { Component }                    from '@angular/core';

import { SearchComponent }              from '../../../../search/search.component';
import { MerchantsRequestsService }     from '../../../../../services/main/institutions/merchants-requests.service';
import { DataBindingService }           from '../../../../../services/data.binding.service';

import { FlyInOut }                     from '../../../../../config/animations.config';

@Component({
  selector: 'merchants-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class MerchantsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: MerchantsRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
