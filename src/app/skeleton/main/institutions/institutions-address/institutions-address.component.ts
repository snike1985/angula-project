import {
  ElementRef,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FilterTableComponent } from '../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../services/data.binding.service';
import { NotificationService } from '../../../../services/notification.service';

import { SelectOptions } from '../../../../interfaces/select-options';
import { ActivatedRoute } from '@angular/router';


export class InstitutionsAddressComponent extends FilterTableComponent {

  protected addressSubscription: Subscription;
  protected queryParamsSubscription: Subscription;
  protected addressOptions: SelectOptions[];


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: any,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    protected route: ActivatedRoute ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }

  private setQueryParams( queryParams: any ): void {

    for ( let key in queryParams ) {

      let requestData = this.itemsService.requestDataSubject.value;

      requestData[ 'filterData' ][ key ] = queryParams[ key ];

      this.itemsService.requestDataSubject.next( requestData );

    }

  }

  private unSubscribeQueryParams(): void {

    if ( this.queryParamsSubscription && !this.queryParamsSubscription.closed ) {

      this.queryParamsSubscription.unsubscribe();

    }

  }


  protected getFilterData(): void {

    this.setFilterLanguage();

    this.subscribeAddress();

  }

  protected subscribeAddress(): void {

    this.addressSubscription = this.itemsService.addressOptions.subscribe( ( options: SelectOptions[] ) => {

      if ( options ) {

        this.addressOptions = options;

        this.updateFilter( 'addresses', this.addressOptions );

      } else {

        this.itemsService.getAddresses();

      }

    } );

  }

  protected subscribeQueryParams(): void {

    this.queryParamsSubscription = this.route.queryParams.subscribe( ( queryParams: any ) => {

      this.setQueryParams( queryParams );

    } );

  }

  protected unSubscribeAddress(): void {

    if ( this.addressSubscription && !this.addressSubscription.closed ) {
      this.addressSubscription.unsubscribe();
      this.itemsService.addressOptions.next( null );
    }


  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.unSubscribeAddress();

    this.unSubscribeQueryParams();

    this.view.unsubscribe();

  }



}
