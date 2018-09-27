import { Http }                   from '@angular/http';
import { Injectable }             from '@angular/core';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';

import { FilterTableService }     from '../../filter-table.service';
import { DataBindingService }     from '../../data.binding.service';

import { CountryStatesRequests }  from '../../../config/requests.config';

import { CountryState }           from '../../../interfaces/country-state';

@Injectable()
export class VelocityLimitsRequestsService extends FilterTableService {

  protected requestConfig: Object = CountryStatesRequests;
  protected items: CountryState[];

  public itemsList: BehaviorSubject<CountryState[]> = new BehaviorSubject( [] );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1',
      country: '-1'
    },
    orderData: {
      name: 'stateName',
      direction: 0
    },
    searchData: ''
  } );

  constructor( protected http: Http, protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();

    this.domain = this.requestConfig[ 'domain' ];

  }

}
