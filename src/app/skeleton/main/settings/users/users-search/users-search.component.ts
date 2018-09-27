import { Component }            from '@angular/core';

import { SearchComponent }       from '../../../../search/search.component';

import { DataBindingService }    from '../../../../../services/data.binding.service';
import { UsersRequestsService }  from '../../../../../services/main/settings/users-requests.service';

import { FlyInOut }              from '../../../../../config/animations.config';


@Component({
  selector: 'users-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class UsersSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: UsersRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
