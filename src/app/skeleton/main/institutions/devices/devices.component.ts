import { Component, OnDestroy }       from '@angular/core';

import { DevicesRequestsService }     from '../../../../services/main/institutions/devices-requests.service';
import { MerchantsRequestsService } from '../../../../services/main/institutions/merchants-requests.service';
import { InstitutionsRequestsService } from '../../../../services/main/institutions/institutions-requests.service';
import { LocationsRequestsService } from '../../../../services/main/institutions/locations-requests.service';
import { DeviceTypesRequestsService } from '../../../../services/main/settings/device-types-requests.service';

@Component( {
  selector: 'devices',
  templateUrl: './devices.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ]
} )
export class DevicesComponent implements OnDestroy  {

  constructor ( private devicesService: DevicesRequestsService,
    private locationsService: LocationsRequestsService,
    private institutionsService: InstitutionsRequestsService,
    private deviceTypesService: DeviceTypesRequestsService,
    private merchantsService: MerchantsRequestsService) {}

  public ngOnDestroy(): void {

    this.devicesService.requestDataSubject.next(  {
      filterData: {
        institutions: '-1',
        status: '-1',
        merchants: '-1',
        locations: '-1'
      },
      orderData: {
        name: 'name',
        direction: 0
      },
      searchData: ''
    } );
    this.devicesService.itemsList.next( [] );
    this.institutionsService.itemsList.next( [] );
    this.locationsService.itemsList.next( [] );
    this.merchantsService.itemsList.next( [] );
    this.deviceTypesService.itemsList.next( [] );

  }

}
