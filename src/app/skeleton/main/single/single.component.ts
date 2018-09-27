import {
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { TableItemComponent } from '../../filter-table/table-item/table-item.component';

import { DataBindingService } from '../../../services/data.binding.service';
import { InstitutionsRequestsService } from '../../../services/main/institutions/institutions-requests.service';
import { NotificationService } from '../../../services/notification.service';
import { OverlayService } from '../../../services/overlay.service';


export class SingleComponent extends TableItemComponent implements OnInit {

  protected id: number;
  protected confirmSubscription: Subscription;
  protected pathAfterRemove: string[];

  public texts: object;
  public status: number = 1;
  public loading: boolean = false;
  public config: object;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: any,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification );


    this.getId();

    this.subscribeTableData( this.id );

  }


  protected createFormGroup(): void {

    this.setStatus();

    this.hideSpinner();

  }

  protected deleteItem( redirectArr ): void {

    let id = this.currentItem[ 'id' ];

    this.itemsService.send( 'delete', {}, `${ id }` )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

          } else {

            this.itemsService.deleteItemById( id );

            this.router.navigate( redirectArr );

            this.notification.successNotify( `${ dataJson[ 'message' ] }` );

          }

        } );

  }

  protected getId(): void {

    let pathArr = this.router.url.substr( 1 )
                      .split( '/' );

    this.id = +pathArr[ pathArr.length - 1 ];

  }

  protected setStatus(): void {

    let currentDate = Date.now();

    if ( currentDate < this.currentItem[ 'activateOn' ] || currentDate > this.currentItem[ 'expiryOn' ] ) {

      this.status = 2;

    } else {

      if ( this.currentItem[ 'status' ] ) {

        this.status = 1;

      } else {

        this.status = 0;

      }

    }

  }

  protected subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: boolean ) => {

      if ( confirm ) {

        this.loading = true;

        this.deleteItem( this.pathAfterRemove );

      }

      this.unSubscribeConfirm();

    } );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    if ( this.scrollSubscription ) {

      this.scrollSubscription.unsubscribe();

    }

    this.view.unsubscribe();

    this.unSubscribeConfirm();

  }

  protected unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }


  public askToDelete( e ): void {

    e.preventDefault();

    this.subscribeConfirm();

    this.overlayService.activePopup$.next( 'DeleteConfirmationComponent' );

  }


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

  }

  public updateStatus(): void {

    this.loading = true;

    this.currentItem[ 'status' ] = !this.currentItem[ 'status' ];

    this.itemsService.send( 'insert', this.currentItem )
        .subscribe( res => {

          this.loading = false;

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.setStatus();

          } else {

            this.currentItem[ 'status' ] = !this.currentItem[ 'status' ];

            this.notification.errorNotify( data[ 'message' ] );
          }

        } );

  }

}
