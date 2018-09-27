import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';

import { CurrenciesRequests } from '../../../config/requests.config';

import { Currency } from '../../../interfaces/currency';
import { NotificationService } from '../../notification.service';


@Injectable()
export class CurrenciesRequestsService extends FilterTableService {

  protected requestConfig: Object = CurrenciesRequests;
  protected items: Currency[];

  public itemsList: BehaviorSubject<Currency[]> = new BehaviorSubject( [] );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1'
    },
    orderData: {
      name: 'code',
      direction: 0
    },
    searchData: ''
  } );

  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();

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
