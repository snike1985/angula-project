import { Http }                 from '@angular/http';
import { Injectable }           from '@angular/core';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';

import { DataBindingService }   from '../../data.binding.service';
import { FilterTableService }   from '../../filter-table.service';

import { DeviceTypesRequests }  from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { DeviceType } from '../../../interfaces/device-type';
import { NotificationService } from '../../notification.service';


@Injectable()
export class DeviceTypesRequestsService extends FilterTableService {

  protected requestConfig: Object = DeviceTypesRequests;
  protected items: DeviceType[];

  public itemsList: BehaviorSubject<DeviceType[]> = new BehaviorSubject( [] );
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


  constructor( protected http: Http, protected dataBindingService: DataBindingService, protected notificationService: NotificationService ) {

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

        this.itemsList.next( data.map( ( item: Object ) => {

          return {
            value: item[ 'id' ],
            text: item[ 'code' ]
          };

        } ) );

      }

    } );

  }

}
