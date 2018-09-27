import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

import { RowComponent } from '../../../../row/row.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { DevicesRequestsService } from '../../../../../services/main/institutions/devices-requests.service';

import { DevicesRowConfig } from '../../../../../config/devices.config';
import { OverlayService } from '../../../../../services/overlay.service';


@Component( {
  selector: 'devices-row',
  templateUrl: './devices-row.component.html',
  styleUrls: [ './devices-row.component.scss' ]
} )
export class DevicesRowComponent extends RowComponent implements OnInit {

  private config = DevicesRowConfig;
  private activateOnSubscription: Subscription;
  private expiryOnSubscription: Subscription;
  private confirmSubscription: Subscription;

  public texts: Object;
  public loading: boolean = false;
  public activateOnControl: FormControl;
  public expiryOnControl: FormControl;
  public status: number = 0;
  public isOpened: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
    private notification: NotificationService,
    private devicesService: DevicesRequestsService,
    private router: Router,
    private overlayService: OverlayService ) {

    super( dataBindingService );

  }


  private createFormControls(): void {

    this.activateOnControl = new FormControl( this.data[ 'activateOn' ] );
    this.expiryOnControl = new FormControl( this.data[ 'expiryOn' ] );

    this.subscribeDateControls();

  }

  private setStatus(): void {

    let currentDate = Date.now();

    if ( currentDate < this.data[ 'activateOn' ] || currentDate > this.data[ 'expiryOn' ] ) {

      this.status = 2;

    } else {

      if ( this.data[ 'status' ] ) {

        this.status = 1;

      } else {

        this.status = 0;

      }

    }

  }

  private subscribeDateControls(): void {

    this.activateOnSubscription = this.activateOnControl.valueChanges.subscribe( ( data: number ) => {

      this.updateActivateOn( data );

    } );

    this.expiryOnSubscription = this.expiryOnControl.valueChanges.subscribe( ( data: number ) => {

      this.updateExpiryOn( data );

    } );

  }

  private subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: boolean ) => {

      if ( confirm ) {

        this.deleteItem();

      }

      this.unSubscribeConfirm();

    } );

  }

  private unSubscribeDateControl(): void {

    if ( this.activateOnSubscription && !this.activateOnSubscription.closed ) {

      this.activateOnSubscription.unsubscribe();

    }
    if ( this.expiryOnSubscription && !this.expiryOnSubscription.closed ) {

      this.expiryOnSubscription.unsubscribe();

    }

  }

  private updateActivateOn( activateOn: number ): void {

    let expiryOn = this.expiryOnControl.value;

    if ( activateOn > expiryOn ) {

      this.expiryOnControl.setValue( activateOn );

    }

    this.updateDates();

  }

  private updateDates(): void {

    this.loading = true;

    this.data[ 'expiryOn' ] = this.expiryOnControl.value;

    this.data[ 'activateOn' ] = this.activateOnControl.value;


    this.devicesService.send( 'insert', this.data )
        .subscribe( res => {

          this.loading = false;

          this.setStatus();

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

          } else {

            this.notification.errorNotify( data[ 'message' ] );

          }

        } );

  }

  private updateExpiryOn( expiryOn: number ): void {

    let activateOn = this.activateOnControl.value;

    if ( activateOn > expiryOn ) {

      this.activateOnControl.setValue( expiryOn );

    }

    this.updateDates();

  }


  protected unsubscribeAll(): void {

    this.viewSizeSubscription.unsubscribe();

    this.searchSubscription.unsubscribe();

    this.unSubscribeDateControl();

    this.unSubscribeConfirm();

  }

  protected unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }


  public askToDelete( e ): void {

    e.stopPropagation();

    this.subscribeConfirm();

    this.devicesService.currentItem.next( this.data );

    this.overlayService.activePopup$.next( 'DeviceDeleteComponent' );

  }

  public closeDropDown(): void {

    this.isOpened = false;

  }

  public deleteItem(): void {

    this.loading = true;

    this.devicesService.send( 'delete', {}, this.data[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.devicesService.deleteItemById( this.data[ 'id' ] );

          } else {

            this.notification.errorNotify( data[ 'message' ] );

          }

          this.loading = false;

        } );

  }

  public open(): void {

    this.devicesService.currentItem.next( this.data );

    this.router.navigate( [
        'institutions',
        'devices',
        this.data[ 'id' ]
      ] );

  }

  public ngOnInit(): void {

    this.setStatus();

    this.texts = this.config[ 'texts' ][ this.language ];

    this.createFormControls();

  }

  public showDropDown(): void {

    this.isOpened = true;

  }

  public setCurrent(): void {

    this.devicesService.currentItem.next( this.data );

  }

  public updateStatus( e ): void {

    e.stopPropagation();

    this.loading = true;

    this.data[ 'status' ] = !this.data[ 'status' ];

    this.devicesService.send( 'insert', this.data )
        .subscribe( res => {

          this.loading = false;

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.setStatus();

          } else {

            this.data[ 'status' ] = !this.data[ 'status' ];

            this.notification.errorNotify( data[ 'message' ] );
          }

        } );

  }

}
