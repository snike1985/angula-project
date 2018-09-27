import { Http }                 from '@angular/http';
import { Injectable }           from '@angular/core';
import { BehaviorSubject }      from 'rxjs/BehaviorSubject';

import { DataBindingService }   from '../../data.binding.service';
import { FilterTableService }   from '../../filter-table.service';
import { NotificationService }  from '../../notification.service';

import { UserRolesRequests }    from '../../../config/requests.config';

import { SelectOptions }        from '../../../interfaces/select-options';
import { UserRole }             from '../../../interfaces/user-role';


@Injectable()
export class UserRolesRequestsService extends FilterTableService {

  protected requestConfig: Object = UserRolesRequests;
  protected items: UserRole[];


  public currentItem: BehaviorSubject<UserRole> = new BehaviorSubject( null );
  public selectOptionsSubject: BehaviorSubject<SelectOptions[]> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1',
      functions: '-1'
    },
    orderData: {
      name: 'name',
      direction: 0
    },
    searchData: ''
  } );
  public itemsList: BehaviorSubject<UserRole[]> = new BehaviorSubject( [] );


  constructor( protected http: Http,
               protected notificationService: NotificationService,
               protected dataBindingService: DataBindingService ) {

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

        this.selectOptionsSubject.next( data[ 'userRoleList' ].map( ( userRoles: Object ) => {

          return {
            value: userRoles[ 'id' ],
            text: userRoles[ 'name' ]
          };

        } ) );

      }

  } );



  }

}
