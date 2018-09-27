import { Http } from '@angular/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';

import { InstitutionsRequests } from '../../../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { NotificationService } from '../../notification.service';

@Injectable()
export class InstitutionsRequestsService extends FilterTableService {


  protected requestConfig: Object = InstitutionsRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      status: '-1',
      addresses: '-1'
    },
    orderData: {
      name: 'name',
      direction: 0
    },
    searchData: ''
  } );
  public progressSubject: BehaviorSubject<number> = new BehaviorSubject( 0 );


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();
    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }


  public upload( files: File[] ) {

    return Observable.create( observer => {

      let formData: FormData = new FormData(),
        xhr: XMLHttpRequest = new XMLHttpRequest();

      for ( let i = 0; i < files.length; i++ ) {

        formData.append( 'csv', files[ i ], files[ i ].name );

      }

      xhr.onreadystatechange = () => {

        if ( xhr.readyState === 4 ) {

          if ( xhr.status === 200 ) {

            observer.next( JSON.parse( xhr.response ) );
            observer.complete();

          } else {

            observer.error( xhr.response );

          }

        }

      };

      xhr.upload.onprogress = ( event ) => {

        this.progressSubject.next( Math.round( event.loaded / event.total * 100 ) );

      };

      xhr.open( 'POST', `${ this.domain }/institution/validate`, true );
      xhr.setRequestHeader( 'X-Auth-Token', this.token );
      xhr.send( formData );

    } );

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
