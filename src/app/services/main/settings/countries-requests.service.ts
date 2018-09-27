import { Http }                             from '@angular/http';
import { Injectable }                       from '@angular/core';

import { DataBindingService }               from '../../data.binding.service';

import { CountriesRequests }                from '../../../config/requests.config';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { FilterTableService } from '../../filter-table.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Country } from '../../../interfaces/country';
import { NotificationService } from '../../notification.service';

@Injectable()
export class CountriesRequestsService extends FilterTableService {

  protected requestConfig: Object = CountriesRequests;
  protected items: Country[];

  public itemsList: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1'
    },
    orderData: {
      name: 'countryName',
      direction: 0
    },
    searchData: ''
  } );

  constructor( protected http: Http,
               protected notificationService: NotificationService,
               protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();

    this.domain = this.requestConfig[ 'domain' ];

  }


  public getSelectOptions(): void {

    this.send( 'getOptions' ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.notificationService.errorNotify( dataJson[ 'message' ] );

      } else {

        let data = dataJson[ 'data' ];

        this.itemsList.next( data[ 'countryList' ].map( ( country: Object ) => {

          return {
            value: country[ 'id' ],
            text: country[ 'name' ]
          };

        } ) );

      }

    } );

  }


}
