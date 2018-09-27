import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { FilterTableService } from '../../filter-table.service';
import { DataBindingService } from '../../data.binding.service';

import { CountryStatesRequests } from '../../../config/requests.config';

import { CountryState } from '../../../interfaces/country-state';
import { NotificationService } from '../../notification.service';

@Injectable()
export class CountryStatesRequestsService extends FilterTableService {

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

  constructor( protected http: Http,
               protected dataBindingService: DataBindingService,
               private notification: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();

    this.domain = this.requestConfig[ 'domain' ];

  }

  public getSelectOptions(): void {


    this.send( 'getOptions' ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.notification.errorNotify( dataJson[ 'message' ] );

      } else {

        let data = dataJson[ 'data' ];

        this.itemsList.next( data[ 'countryStateList' ].map( ( state: Object ) => {

          return {
            value: state[ 'id' ],
            text: state[ 'name' ]
          };

        } ) );

      }

    } );


  }


}
