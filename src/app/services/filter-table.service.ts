import { AjaxService }         from './ajax.service';
import { DataBindingService }  from './data.binding.service';
import { Http }                from '@angular/http';
import { Subscription }        from 'rxjs/Subscription';
import { BehaviorSubject }     from 'rxjs/BehaviorSubject';
import { SelectOptions } from '../interfaces/select-options';

export class FilterTableService extends AjaxService {

  private requestDataSubscription: Subscription;
  private itemsListSubscription: Subscription;
  private requestData: Object;

  protected items: Object[];

  public itemsList: BehaviorSubject<Object[]> = new BehaviorSubject( [] );
  public requestDataSubject: BehaviorSubject<Object>;
  public addressOptions: BehaviorSubject<SelectOptions> = new BehaviorSubject( null );


  constructor( protected http: Http,
               protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

  }


  protected subscribeRequestData(): void {

    this.requestDataSubscription = this.requestDataSubject.subscribe( ( data ) => {

      this.requestData = data;

    } );

  }

  protected subscribeItemsList(): void {

    this.itemsListSubscription = this.itemsList.subscribe( ( data ) => {

      this.items = data;

    } );

  }


  public getAddresses(): void {

    this.send( 'getAddresses' ).subscribe( ( res ) => {

      this.addressOptions.next( res.json()[ 'data' ].map( item => {

        let name = item[ 'name' ].join( ', ' );

        return {
          value: name,
          text: name,
          subtitle: item[ 'type' ]
        };

      } ) );

    } );

  }

  public deleteItemById( id: number ): void {

    this.items = this.items.filter( data => {

      return data[ 'id' ] !== id;

    } );

    this.itemsList.next( this.items );

  }

  public setFilterData( filterData: Object ): void {

    this.requestData[ 'filterData' ] = filterData;

    this.requestDataSubject.next( this.requestData );

  }

  public setOrderData( orderData: Object ): void {

    this.requestData[ 'orderData' ] = orderData;

    this.requestDataSubject.next( this.requestData );

  }

  public setSearchData( searchData: string ): void {

    this.requestData[ 'searchData' ] = searchData;

    this.requestDataSubject.next( this.requestData );

  }

  public updateItem( item: Object ): void {

    for ( let data of this.items ) {

      if ( item[ 'id' ] === data[ 'id' ] ) {
        data = item;
      }

    }


    this.itemsList.next( this.items );

  }



}
