import {
  Component,
  OnDestroy
} from '@angular/core';

import { LocationsRequestsService } from '../../../../services/main/institutions/locations-requests.service';
import { InstitutionsRequestsService } from '../../../../services/main/institutions/institutions-requests.service';
import { MerchantsRequestsService } from '../../../../services/main/institutions/merchants-requests.service';


@Component( {
  selector: 'locations',
  templateUrl: './locations.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ]
} )
export class LocationsComponent implements OnDestroy {

  constructor( private locationsService: LocationsRequestsService,
    private institutionsService: InstitutionsRequestsService,
    private merchantsService: MerchantsRequestsService ) {}


  public ngOnDestroy(): void {

    this.locationsService.requestDataSubject.next( {
      filterData: {
        institutions: '-1',
        merchants: '-1',
        status: '-1',
        addresses: '-1'
      },
      orderData: {
        name: 'name',
        direction: 0
      },
      searchData: ''
    } );
    this.locationsService.itemsList.next( [] );
    this.locationsService.addressOptions.next( null );
    this.institutionsService.itemsList.next( [] );
    this.merchantsService.itemsList.next( [] );

  }

}
