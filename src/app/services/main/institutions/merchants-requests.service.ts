import { Http }                   from '@angular/http';
import { Injectable }             from '@angular/core';
import { BehaviorSubject }        from 'rxjs/BehaviorSubject';

import { DataBindingService }     from '../../data.binding.service';
import { FilterTableService }     from '../../filter-table.service';

import { MerchantsRequests }   from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotificationService } from '../../notification.service';

@Injectable()
export class MerchantsRequestsService extends FilterTableService {

  protected requestConfig: Object = MerchantsRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      institutions: '-1',
      status: '-1',
      addresses: '-1',
      options: '-1'
    },
    orderData: {
      name: 'name',
      direction: 0
    },
    searchData: ''
  } );
  public categoriesList: BehaviorSubject<Object[]> = new BehaviorSubject( [] );


  constructor(
    protected http: Http,
    protected dataBindingService: DataBindingService,
    private  notificationService: NotificationService) {

    super( http, dataBindingService );

    this.subscribeRequestData();
    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }


  public getSelectOptions(): void {

    this.send( 'getOptions' ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.notificationService.errorNotify( dataJson[ 'message' ] );

      } else {

        let data = dataJson[ 'data' ];

        this.itemsList.next( data.map( ( userRoles: Object ) => {

          return {
            value: userRoles[ 'id' ],
            text: userRoles[ 'name' ]
          };

        } ) );

      }

    } );

  }

  public getCategories(): void {

    this.send( 'getCategories' ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.notificationService.errorNotify( dataJson[ 'message' ] );

      } else {

        let data = dataJson[ 'data' ];

        this.categoriesList.next( data.map( ( categories: Object ) => {

          return {
            value: categories[ 'id' ],
            text: categories[ 'name' ]
          };

        } ) );

      }

    } );

  }

}
