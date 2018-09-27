import { Injectable } from '@angular/core';
import { FilterTableService } from '../../filter-table.service';
import { DataBindingService } from '../../data.binding.service';
import { Http } from '@angular/http';
import { WorkflowRequests } from '../../../config/requests.config';
import { NotificationService } from '../../notification.service';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class WorkflowService extends FilterTableService {

  protected requestConfig: Object = WorkflowRequests;

  public services: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public currentPaymentMethods: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public currentWorkflow: BehaviorSubject<Object> = new BehaviorSubject( null );
  public currentWorkflowGroup: BehaviorSubject<Object> = new BehaviorSubject( null );
  public confirm: BehaviorSubject<any> = new BehaviorSubject( null );
  public serviceChanges: BehaviorSubject<Object> = new BehaviorSubject( null );
  public changesMade: Subject<boolean> = new Subject();

  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }


  public getAllItems(): void {

    this.send( 'getData' )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.itemsList.next( data['data'] );

          } else {

            this.notificationService.errorNotify( data[ 'message' ] )

          }

        } );

  }

  public getAllServices(): void {

    this.send( 'getServices' )
        .subscribe( res => {

          let data = res.json();


          if ( data[ 'status' ] === 'success' ) {


            this.services.next( data[ 'data' ].map( ( item: Object ) => {

              return {
                value: item[ 'id' ],
                text: item[ 'name' ]
              };

            } ) );

          } else {

            this.notificationService.errorNotify( data[ 'message' ] )

          }

        } );

  }

}
