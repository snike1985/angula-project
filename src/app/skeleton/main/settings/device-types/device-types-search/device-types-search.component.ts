import { Component }                   from '@angular/core';

import { SearchComponent }             from '../../../../search/search.component';

import { DataBindingService }          from '../../../../../services/data.binding.service';
import { DeviceTypesRequestsService }  from '../../../../../services/main/settings/device-types-requests.service';

import { FlyInOut }                    from '../../../../../config/animations.config';

@Component( {
  selector: 'device-types-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class DeviceTypesSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: DeviceTypesRequestsService ) {

    super( dataBindingService, itemsService );

  }


}
