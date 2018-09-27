import { Injectable } from '@angular/core';
import { AjaxService } from './ajax.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { DataBindingService } from './data.binding.service';
import { Http } from '@angular/http';
import { NotificationService } from './notification.service';
import { ObjectTypesRequests } from '../config/requests.config';

@Injectable()
export class ObjectTypesService extends AjaxService {

  protected requestConfig: Object = ObjectTypesRequests;

  public itemsList: BehaviorSubject<Object[]> = new BehaviorSubject( [] );

  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

  }

  public getAll(): void {

    this.send( 'getAll' )
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
