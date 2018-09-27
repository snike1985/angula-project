import { Component }                from '@angular/core';

import { SearchComponent }          from '../../../../search/search.component';

import { DataBindingService }       from '../../../../../services/data.binding.service';
import { DevicesRequestsService }   from '../../../../../services/main/institutions/devices-requests.service';

import { FlyInOut }                 from '../../../../../config/animations.config';


@Component({
  selector: 'devices-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class DevicesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: DevicesRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
