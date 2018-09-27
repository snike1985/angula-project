import { Injectable } from '@angular/core';
import { VelocityLimitsRequests } from '../../../config/requests.config';
import { FilterTableService } from '../../filter-table.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Http } from '@angular/http';
import { DataBindingService } from '../../data.binding.service';

@Injectable()
export class VelocityLimitsService extends FilterTableService {

  protected requestConfig: Object = VelocityLimitsRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      limit_to: '-1',
      transaction_type: '-1',
      status: '-1'
    },
    orderData: {
      name: 'date',
      direction: 0
    },
    searchData: ''
  } );
  public itemsList: BehaviorSubject<Object[]> = new BehaviorSubject( [] );

  constructor( protected http: Http,
    protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

    this.subscribeRequestData();
    this.subscribeItemsList();

  }

}
