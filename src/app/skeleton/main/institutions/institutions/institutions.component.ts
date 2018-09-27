import {
  Component,
  OnDestroy
} from '@angular/core';

import { InstitutionsRequestsService } from '../../../../services/main/institutions/institutions-requests.service';
import { CountriesRequestsService } from '../../../../services/main/settings/countries-requests.service';
import { CountryStatesRequestsService } from '../../../../services/main/settings/country-states-requests.service';


@Component( {
  selector: 'institutions',
  templateUrl: './institutions.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ]
} )
export class InstitutionsComponent implements OnDestroy {

  constructor( private institutionsService: InstitutionsRequestsService,
    private countriesService: CountriesRequestsService,
    private stateServise: CountryStatesRequestsService ) {}


  public ngOnDestroy(): void {

    this.institutionsService.requestDataSubject.next( {
      filterData: {
        status: '-1',
        addresses: '-1'
      },
      orderData: {
        name: 'name',
        direction: 0
      },
      searchData: ''
    } );
    this.institutionsService.itemsList.next( [] );
    this.institutionsService.addressOptions.next( null );
    this.countriesService.itemsList.next( [] );
    this.stateServise.itemsList.next( [] );

  }

}
