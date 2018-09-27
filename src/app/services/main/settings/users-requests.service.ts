import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';

import { UsersRequests } from '../../../config/requests.config';

import { User } from '../../../interfaces/user';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { NotificationService } from '../../notification.service';

@Injectable()
export class UsersRequestsService extends FilterTableService {

  protected requestConfig: Object = UsersRequests;
  protected items: User[];

  public currentItem: BehaviorSubject<User> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1',
      userRoles: '-1'
    },
    orderData: {
      name: 'firstName',
      direction: 0
    },
    searchData: ''
  } );
  public itemsList: BehaviorSubject<User[]> = new BehaviorSubject( [] );


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notification: NotificationService ) {

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

            this.notification.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.itemsList.next( data.map( ( state: Object ) => {

              return {
                value: state[ 'id' ],
                text: state[ 'name' ]
              };

            } ) );

          }

        } );

  }

}
