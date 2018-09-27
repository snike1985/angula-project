import { Injectable }          from '@angular/core';
import { Http }                from '@angular/http';

import { FilterTableService }  from '../../filter-table.service';
import { DataBindingService }  from '../../data.binding.service';

import { FunctionsRequests }   from '../../../config/requests.config';
import { NotificationService } from '../../notification.service';
import { SelectOptions } from '../../../interfaces/select-options';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class FunctionsService extends FilterTableService {

  protected requestConfig: Object = FunctionsRequests;
  protected items: SelectOptions[];

  public itemsList: BehaviorSubject<SelectOptions[]> = new BehaviorSubject( [] );


  constructor( protected http: Http,
               protected dataBindingService: DataBindingService,
               private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

    this.subscribeItemsList();

  }

  public getSelectOptions(): void {

    this.send( 'getData' ).subscribe( res => {


      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.notificationService.errorNotify( dataJson[ 'message' ] );

      } else {

        this.itemsList.next( dataJson[ 'data' ][ 'functionList' ].map( ( functionItem: Object ) => {

          return {
            value: functionItem[ 'id' ],
            text: functionItem[ 'code' ]
          };

        } ) );

      }

    } );

  }

}
