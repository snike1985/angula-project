import { Component, OnInit } from '@angular/core';
import { FlyInOut } from '../../../../../config/animations.config';
import { SearchComponent } from '../../../../search/search.component';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';

@Component({
  selector: 'locations-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
})
export class LocationsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LocationsRequestsService ) {

    super( dataBindingService, itemsService );

  }

}
