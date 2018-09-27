import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { RowComponent } from '../../../../row/row.component';
import { LocationsRowConfig } from '../../../../../config/locations.config';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';
import { Router } from '@angular/router';
import { OverlayService } from '../../../../../services/overlay.service';

@Component({
  selector: 'location-row',
  templateUrl: './location-row.component.html',
  styleUrls: ['./location-row.component.scss']
})
export class LocationRowComponent extends RowComponent implements OnInit {

  @Input() public role: string;

  private config = LocationsRowConfig;
  private activateOnSubscription: Subscription;
  private expiryOnSubscription: Subscription;
  private confirmSubscription: Subscription;

  public texts: Object;
  public loading: boolean = false;
  public activateOnControl: FormControl;
  public expiryOnControl: FormControl;
  public status: number = 0;


  constructor( protected dataBindingService: DataBindingService,
    private notification: NotificationService,
    private locationsService: LocationsRequestsService,
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


    this.locationsService.send( 'insert', this.data )
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

    e.preventDefault();

    this.subscribeConfirm();

    this.locationsService.currentItem.next( this.data );

    this.overlayService.activePopup$.next( 'LocationDeleteComponent' );

  }

  public deleteItem(): void {

    this.loading = true;

    this.locationsService.send( 'delete', {}, this.data[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.locationsService.deleteItemById( this.data[ 'id' ] );

          } else {

            this.notification.errorNotify( data[ 'message' ] );

          }

          this.loading = false;

        } );

  }

  public open(): void {

    this.locationsService.currentItem.next( this.data );

    this.router.navigate( [
      'institutions',
      'locations',
      this.data[ 'id' ]
    ] );

  }

  public ngOnInit(): void {

    this.setStatus();

    this.texts = this.config[ 'texts' ][ this.language ];

    this.createFormControls();

  }

  public setCurrent(): void {

    this.locationsService.currentItem.next( this.data );

  }

  public updateStatus( e ): void {

    e.stopPropagation();

    this.loading = true;

    this.data[ 'status' ] = !this.data[ 'status' ];

    this.locationsService.send( 'insert', this.data )
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
