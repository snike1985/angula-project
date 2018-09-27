import { Component }                 from '@angular/core';

import { SearchComponent }           from '../../../../search/search.component';

import { DataBindingService }        from '../../../../../services/data.binding.service';
import { UserRolesRequestsService }  from '../../../../../services/main/settings/user-roles-requests.service';

import { FlyInOut }                  from '../../../../../config/animations.config';


@Component( {
  selector: 'user-roles-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class UserRolesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: UserRolesRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
