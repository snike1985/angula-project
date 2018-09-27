import { Http }                   from '@angular/http';
import { Injectable }             from '@angular/core';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';

import { DataBindingService }     from '../../data.binding.service';
import { FilterTableService }     from '../../filter-table.service';

import { LogsAccessRequests } from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LogsAccessRequestsService extends FilterTableService {

  protected requestConfig: Object = LogsAccessRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      user: '-1',
      loginResult: '-1',
      period: '-1'
    },
    orderData: {
      name: 'log_in',
      direction: 0
    },
    searchData: ''
  } );


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();
    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }

}
