import {
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { TableItemComponent } from '../filter-table/table-item/table-item.component';

import { NotificationService } from '../../services/notification.service';
import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';


export class CreateEditComponent extends TableItemComponent implements OnInit {

  private deleting: boolean = false;

  protected comingBack: boolean = false;
  protected pathAfterRemove: string[];
  protected confirmSubscription: Subscription;
  protected startData: Object;

  public fg: FormGroup;
  public config: Object;
  public texts: Object;
  public isEdit: boolean;
  public loading: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: any,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification );

  }


  protected showInvalidItems(): void {

    for ( let controlKey in this.fg.controls ) {

      this.fg.controls[ controlKey ].markAsTouched();

    }

  }

  protected checkView(): void {

    let pathArr = this.router.url.substr( 1 )
                      .split( '/' );

    if ( pathArr[ pathArr.length - 1 ] === 'create' ) {

      this.isEdit = false;
      this.createFormGroup();

    } else {

      this.isEdit = true;
      this.subscribeTableData( +pathArr[ pathArr.length - 2 ] );

    }

  }

  protected create( value: Object ): void {}

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

  protected edit( value: Object ): void {}

  protected subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: boolean ) => {

      if ( confirm ) {

        if ( this.deleting ) {

          this.deleting = false;

          this.loading = true;

          this.deleteItem( this.pathAfterRemove );

        } else if ( this.comingBack ) {

          this.comingBack = false;

          this.router.navigate( this.pathAfterRemove );

        } else {

          this.location.back();

        }

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

    if ( this.tableDataSubscription ) {

      this.tableDataSubscription.unsubscribe();

    }

    this.unSubscribeConfirm();

  }

  protected unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }


  public askToDelete( e, componentName: string = 'DeleteConfirmationComponent' ): void {

    e.preventDefault();

    this.subscribeConfirm();

    this.deleting = true;

    this.overlayService.activePopup$.next( componentName );

  }

  public back(): void {

    if ( JSON.stringify( this.fg.value ) !== JSON.stringify( this.startData ) ) {

      this.comingBack = true;

      this.subscribeConfirm();

      this.overlayService.activePopup$.next( 'DiscardComponent' );

    } else {

      console.log( this.pathAfterRemove );

      this.router.navigate( this.pathAfterRemove );

    }

  }

  public cancel(): void {

    if ( JSON.stringify( this.fg.value ) !== JSON.stringify( this.startData ) ) {

      this.subscribeConfirm();

      this.overlayService.activePopup$.next( 'DiscardComponent' );

    } else {

      this.location.back();

    }

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

  }

  public submit( { value } ): void {

    if ( this.fg.valid ) {

      if ( this.isEdit ) {

        this.edit( value );

      } else {

        this.create( value );

      }

    } else {

      this.showInvalidItems();

    }

  }

}
