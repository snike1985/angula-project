import {
  ElementRef,
  Renderer2
}                                  from '@angular/core';
import { Subscription }            from 'rxjs/Subscription';

import { ContentCommonComponent }  from '../../content-common/content-common.component';

import { DataBindingService }      from '../../../services/data.binding.service';
import { NotificationService }     from '../../../services/notification.service';


export class TableItemComponent extends ContentCommonComponent {

  protected tableDataSubscription: Subscription;

  public currentItem: Object;


  constructor( protected dataBindingService: DataBindingService,
               protected elemHref: ElementRef,
               protected itemsService: any,
               protected renderer: Renderer2,
               protected notification: NotificationService ) {

    super( dataBindingService, elemHref, renderer );

  }


  protected clearAllItems(): void {

    this.itemsService.currentItem.next( null );

  }

  protected createFormGroup(): void {
  }

  protected getItem( id: number ): void {

    this.itemsService.send( 'getItem', {}, id )
    .subscribe(
      res => {

        let dataJson = res.json();

        if ( dataJson[ 'status' ] === 'failure' ) {

          this.notification.errorNotify( dataJson[ 'message' ] );

        } else {

          this.currentItem = dataJson[ 'data' ];

          this.itemsService.currentItem.next( this.currentItem );

          this.createFormGroup();

        }

      } );

  }

  protected subscribeTableData( id: number ): void {

    this.tableDataSubscription = this.itemsService.currentItem.subscribe( ( data ) => {

      if ( data ) {

        this.currentItem = data;
        this.createFormGroup();

      } else {

        if ( id ) {

          this.getItem( id );

        }

      }

    } );

  }

}
