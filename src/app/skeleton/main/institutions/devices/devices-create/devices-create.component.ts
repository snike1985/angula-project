import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Subscription } from 'rxjs/Subscription';

import { InstitutionCommonCreateComponent } from '../../institution-common-create/institution-common-create.component';

import { NotificationService } from '../../../../../services/notification.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';
import { DevicesRequestsService } from '../../../../../services/main/institutions/devices-requests.service';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';
import { DeviceTypesRequestsService } from '../../../../../services/main/settings/device-types-requests.service';
import { CurrenciesRequestsService } from '../../../../../services/main/settings/currencies-requests.service';

import { DevicesCreateConfig } from '../../../../../config/devices.config';
import { FadeInOut } from '../../../../../config/animations.config';

import { SelectOptions } from '../../../../../interfaces/select-options';


@Component( {
  selector: 'devices-create',
  templateUrl: './devices-create.component.html',
  styleUrls: [ './devices-create.component.scss' ],
  animations: [ FadeInOut ]
} )
export class DevicesCreateComponent extends InstitutionCommonCreateComponent {

  private institutionSubscription: Subscription;
  private typesSubscription: Subscription;
  private merchantsSubscription: Subscription;
  private locationsSubscription: Subscription;

  protected pathAfterRemove: string[] = [
    'institutions',
    'devices'
  ];

  public config: object = DevicesCreateConfig;
  public institutionsOptions: SelectOptions[];
  public typesOptions: SelectOptions[];
  public merchantsOptions: SelectOptions[];
  public locationsOptions: SelectOptions[];
  public currentItem: Object = {
    id: null,
    code: null,
    type: null,
    institution: null,
    location: null,
    merchant: null,
    activateOn: null,
    expiryOn: null,
    status: false
  };


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: DevicesRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,
    private institutionsService: InstitutionsRequestsService,
    private deviceTypesService: DeviceTypesRequestsService,
    private locationsService: LocationsRequestsService,
    private merchantService: MerchantsRequestsService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.subscribeInstitution();
    this.subscribeTypes();
    this.subscribeMerchants();
    this.subscribeLocations();

  }




  private subscribeLocations(): void {

    this.locationsSubscription = this.locationsService.itemsList.subscribe( ( locations: any ) => {

      if ( locations.length ) {

        this.locationsOptions = locations;

        if ( this.institutionsOptions && this.typesOptions && this.merchantsOptions ) {

          this.checkView();

        }

      } else {

        this.locationsService.getSelectOptions();

      }

    } );

  }

  private unSubscribeLocations(): void {

    if ( this.locationsSubscription && !this.locationsSubscription.closed ) {

      this.locationsSubscription.unsubscribe();

    }

  }

  private subscribeMerchants(): void {

    this.merchantsSubscription = this.merchantService.itemsList.subscribe( ( merchants: any ) => {

      if ( merchants.length ) {

        this.merchantsOptions = merchants;

        if ( this.institutionsOptions && this.typesOptions && this.locationsOptions ) {

          this.checkView();

        }

      } else {

        this.merchantService.getSelectOptions();

      }

    } );

  }

  private unSubscribeMerchants(): void {

    if ( this.merchantsSubscription && !this.merchantsSubscription.closed ) {

      this.merchantsSubscription.unsubscribe();

    }

  }

  private subscribeTypes(): void {

    this.typesSubscription = this.deviceTypesService.itemsList.subscribe( ( types: any ) => {

      if ( types.length ) {

        this.typesOptions = types;

        if ( this.institutionsOptions && this.merchantsOptions && this.locationsOptions ) {

          this.checkView();

        }

      } else {

        this.deviceTypesService.getSelectOptions();

      }

    } );

  }

  private unSubscribeTypes(): void {

    if ( this.typesSubscription && !this.typesSubscription.closed ) {

      this.typesSubscription.unsubscribe();

    }

  }

  private subscribeInstitution(): void {

    this.institutionSubscription = this.institutionsService.itemsList.subscribe( ( institution: any ) => {

      if ( institution.length ) {

        this.institutionsOptions = institution;

        if ( this.typesOptions && this.merchantsOptions && this.locationsOptions ) {

          this.checkView();

        }

      } else {

        this.institutionsService.getSelectOptions();

      }

    } );

  }

  private unSubscribeInstitution(): void {

    if ( this.institutionSubscription && !this.institutionSubscription.closed ) {

      this.institutionSubscription.unsubscribe();

    }

  }


  protected createFormGroup(): void {

    let institution = ( this.currentItem[ 'institution' ] ) ? this.currentItem[ 'institution' ][ 'id' ] : this.institutionsOptions[ 0 ][ 'value' ],
      type = ( this.currentItem[ 'type' ] ) ? this.currentItem[ 'type' ][ 'id' ] : this.typesOptions[ 0 ][ 'value' ],
      merchant = ( this.currentItem[ 'merchant' ] ) ? this.currentItem[ 'merchant' ][ 'id' ] : this.merchantsOptions[ 0 ][ 'value' ],
      location = ( this.currentItem[ 'location' ] ) ? this.currentItem[ 'location' ][ 'id' ] : this.locationsOptions[ 0 ][ 'value' ];

    this.activateOnControl = new FormControl( this.currentItem[ 'activateOn' ], Validators.required );
    this.expiryOnControl = new FormControl( this.currentItem[ 'expiryOn' ], Validators.required );

    this.fg = new FormGroup( {
      type: new FormControl( type ),
      institution: new FormControl( institution ),
      merchant: new FormControl( merchant ),
      location: new FormControl( location ),
      activateOn: this.activateOnControl,
      expiryOn: this.expiryOnControl,
      status: new FormControl( false )
    } );

    this.subscribeDateControls();

    this.startData = this.fg.value;

    this.hideSpinner();

  }

  protected setData( data: Object ): void {

    this.currentItem[ 'activateOn' ] = data[ 'activateOn' ];
    this.currentItem[ 'expiryOn' ] = data[ 'expiryOn' ];
    this.currentItem[ 'type' ] = data[ 'type' ];
    this.currentItem[ 'institution' ] = data[ 'institution' ];
    this.currentItem[ 'location' ] = data[ 'location' ];
    this.currentItem[ 'merchant' ] = data[ 'merchant' ];

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
    this.unSubscribeFg();
    this.unSubscribeInstitution();
    this.unSubscribeTypes();
    this.unSubscribeLocations();
    this.unSubscribeMerchants();

  }


}
