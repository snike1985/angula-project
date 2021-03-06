import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';

import { DevicesRequests } from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotificationService } from '../../notification.service';

@Injectable()
export class DevicesRequestsService extends FilterTableService {

  protected requestConfig: Object = DevicesRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
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


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();
    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }

  public getSelectOptions(): void {

    this.send( 'getOptions' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.itemsList.next( data.map( ( item: Object ) => {

              return {
                value: item[ 'id' ],
                text: item[ 'name' ]
              };

            } ) );

          }

        } );

  }


}
