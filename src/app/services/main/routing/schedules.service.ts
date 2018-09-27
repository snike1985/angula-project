import { Injectable } from '@angular/core';
import { FilterTableService } from '../../filter-table.service';
import { ScheduleRequests } from '../../../config/requests.config';
import { Http } from '@angular/http';
import { DataBindingService } from '../../data.binding.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class SchedulesService extends FilterTableService {

  protected requestConfig: Object = ScheduleRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      version: '-1',
      date: '-1',
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
