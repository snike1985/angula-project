import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { DataBindingService } from '../../data.binding.service';
import { FilterTableService } from '../../filter-table.service';
import { LogsTransactionsRequests } from '../../../config/requests.config';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { NotificationService } from '../../notification.service';

@Injectable()
export class TransactionLogsService extends FilterTableService {

  protected requestConfig: Object = LogsTransactionsRequests;

  public currentItem: BehaviorSubject<Object> = new BehaviorSubject( null );
  public jsonSubject: BehaviorSubject<Object> = new BehaviorSubject( null );
  public rowDataSubject: BehaviorSubject<Object> = new BehaviorSubject( null );
  public statusOptions: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public transactionOptions: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public cardsOptions: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public requestDataSubject: BehaviorSubject<Object> = new BehaviorSubject( {
    filterData: {
      transaction: '-1',
      status: '-1',
      period: '-1',
      forReview: false,
      institution: '-1',
      merchant: '-1',
      location: '-1',
      device: '-1',
      cardType: '-1',
      amount: '-1',
      currency: '-1'
    },
    orderData: {
      name: 'date',
      direction: 0
    },
    searchData: ''
  } );


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    protected notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.subscribeRequestData();
    this.subscribeItemsList();

    this.domain = this.requestConfig[ 'domain' ];

  }

  public getCardOptions(): void {

    this.send( 'getCardTypes' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.cardsOptions.next( data.map( ( item: Object ) => {

              return {
                value: item[ 'id' ],
                text: item[ 'name' ]
              };

            } ) );

          }

        } );

  }

  public getStatusOptions(): void {

    this.send( 'getStatusesList' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.statusOptions.next( data.map( ( item: Object ) => {

              return {
                value: item[ 'id' ],
                text: item[ 'name' ]
              };

            } ) );

          }

        } );

  }

  public getTransactionOptions(): void {

    this.send( 'getOptions' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.transactionOptions.next( data.map( ( item: Object ) => {

              return {
                value: item[ 'id' ],
                text: item[ 'name' ]
              };

            } ) );

          }

        } );

  }

  public getJsonById( id: number ) {

    this.send( 'getJson', {}, id + '' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.jsonSubject.next( { failed: true } );

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.jsonSubject.next( data );

          }


        } );

  }

  public getXmlById( id: number ) {

    this.send( 'getRowData', {}, id + '' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.rowDataSubject.next( { failed: true } );

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.rowDataSubject.next( data );

          }


        } );

  }

}
