import { Component }                    from '@angular/core';
import { SearchComponent }              from '../../../../search/search.component';

import { InstitutionsRequestsService }  from '../../../../../services/main/institutions/institutions-requests.service';
import { DataBindingService }           from '../../../../../services/data.binding.service';

import { FlyInOut }                     from '../../../../../config/animations.config';

@Component({
  selector: 'institutions-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class InstitutionsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: InstitutionsRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
