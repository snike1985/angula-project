import { Component, OnDestroy }           from '@angular/core';

import { MerchantsRequestsService }       from '../../../../services/main/institutions/merchants-requests.service';

import { FadeInOut, VisibilityChanged }   from '../../../../config/animations.config';
import { InstitutionsRequestsService } from '../../../../services/main/institutions/institutions-requests.service';
import { MerchantsConfig } from '../../../../config/merchants.config';

@Component( {
  selector: 'merchants',
  templateUrl: './merchants.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
} )
export class MerchantsComponent implements OnDestroy  {

  private config = MerchantsConfig;

  constructor( private merchantsService: MerchantsRequestsService,
    private institutionsService: InstitutionsRequestsService) {}

  public ngOnDestroy(): void {

    this.merchantsService.requestDataSubject.next( {
      filterData: {
        institutions: '-1',
        status: '-1',
        addresses: '-1',
        options: '-1'
      },
      orderData: {
        name: 'name',
        direction: 0
      },
      searchData: ''
    } );
    this.merchantsService.itemsList.next( [] );
    this.merchantsService.addressOptions.next( null );
    this.institutionsService.itemsList.next( [] );

  }

}
