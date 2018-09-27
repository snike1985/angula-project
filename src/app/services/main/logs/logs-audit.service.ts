import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';

import { LogsAuditRequests } from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class LogsAuditRequestsService extends FilterTableService {

  protected requestConfig: Object = LogsAuditRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      object: '-1',
      action: '-1',
      period: '-1',
      user: '-1'
    },
    orderData: {
      name: 'date',
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
