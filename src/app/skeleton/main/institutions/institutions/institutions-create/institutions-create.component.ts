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
import { Subscription } from 'rxjs/Subscription';



import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { CountriesRequestsService } from '../../../../../services/main/settings/countries-requests.service';
import { CountryStatesRequestsService } from '../../../../../services/main/settings/country-states-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { InstitutionsCreateConfig } from '../../../../../config/institutions.config';
import {
  FadeInOut,
  TabsAnimation,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { InstitutionCommonCreateComponent } from '../../institution-common-create/institution-common-create.component';
import { Location } from '@angular/common';

@Component( {
  selector: 'institutions-create',
  templateUrl: './institutions-create.component.html',
  styleUrls: [ './institutions-create.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut,
    TabsAnimation
  ]
} )
export class InstitutionsCreateComponent extends InstitutionCommonCreateComponent {

  protected pathAfterRemove: string[] = [ 'institutions' ];
  protected statesSubscription: Subscription;
  protected countriesSubscription: Subscription;

  public config: object = InstitutionsCreateConfig;
  public currentItem: Object = {
    id: null,
    code: null,
    name: '',
    description: '',
    activateOn: null,
    expiryOn: null,
    status: false,
    institutionDetail: {
      email: '',
      phone: '',
      fax: '',
      address1: '',
      address2: '',
      city: '',
      country: null,
      countryState: null,
      zip: ''
    }
  };


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: InstitutionsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,
    private countriesService: CountriesRequestsService,
    private statesService: CountryStatesRequestsService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.subscribeCountries();

    this.subscribeStates();

  }


  protected createFormGroup(): void  {

    let country = ( this.currentItem[ 'institutionDetail' ][ 'country' ] ) ? this.currentItem[ 'institutionDetail' ][ 'country' ] : this.countriesOptions[ 0 ][ 'value' ],
      state = ( this.currentItem[ 'institutionDetail' ][ 'state' ] ) ? this.currentItem[ 'institutionDetail' ][ 'state' ] : this.statesOptions[ 0 ][ 'value' ];

    this.activateOnControl = new FormControl( this.currentItem[ 'activateOn' ], Validators.required );
    this.expiryOnControl = new FormControl( this.currentItem[ 'expiryOn' ], Validators.required );

    this.fg = new FormGroup( {
      general: new FormGroup( {
        name: new FormControl( this.currentItem[ 'name' ], Validators.required ),
        description: new FormControl( this.currentItem[ 'description' ] ),
        activateOn: this.activateOnControl,
        expiryOn: this.expiryOnControl,
        status: new FormControl( false )
      } ),
      institutionDetail: new FormGroup( {
        email: new FormControl( this.currentItem[ 'institutionDetail' ][ 'email' ], [ this.dynamicEmailValidator.bind( this ) ] ),
        phone: new FormControl( this.currentItem[ 'institutionDetail' ][ 'phone' ] ),
        fax: new FormControl( this.currentItem[ 'institutionDetail' ][ 'fax' ] ),
        address1: new FormControl( this.currentItem[ 'institutionDetail' ][ 'address1' ] ),
        address2: new FormControl( this.currentItem[ 'institutionDetail' ][ 'address2' ] ),
        city: new FormControl( this.currentItem[ 'institutionDetail' ][ 'city' ] ),
        country: new FormControl( country ),
        countryState: new FormControl( state ),
        zip: new FormControl( this.currentItem[ 'institutionDetail' ][ 'zip' ] )
      } )
    } );

    this.fgSubscription = this.fg.valueChanges.subscribe( data => {

      this.generalErrorsCount = this.checkGroupErrors( 'general' );
      this.contactErrorsCount = this.checkGroupErrors( 'institutionDetail' );
      this.optionErrorsCount = this.checkGroupErrors( 'options' );

    } );

    this.subscribeDateControls();

    this.startData = this.fg.value;

    this.hideSpinner();

  }

  protected setData( data: Object ): void {

    this.currentItem[ 'name' ] = data[ 'general' ][ 'name' ];
    this.currentItem[ 'description' ] = data[ 'general' ][ 'description' ];
    this.currentItem[ 'activateOn' ] = data[ 'general' ][ 'activateOn' ];
    this.currentItem[ 'expiryOn' ] = data[ 'general' ][ 'expiryOn' ];

    this.currentItem[ 'institutionDetail' ][ 'email' ] = data[ 'institutionDetail' ][ 'email' ];
    this.currentItem[ 'institutionDetail' ][ 'phone' ] = data[ 'institutionDetail' ][ 'phone' ];
    this.currentItem[ 'institutionDetail' ][ 'fax' ] = data[ 'institutionDetail' ][ 'fax' ];
    this.currentItem[ 'institutionDetail' ][ 'address1' ] = data[ 'institutionDetail' ][ 'address1' ];
    this.currentItem[ 'institutionDetail' ][ 'address2' ] = data[ 'institutionDetail' ][ 'address2' ];
    this.currentItem[ 'institutionDetail' ][ 'city' ] = data[ 'institutionDetail' ][ 'city' ];
    this.currentItem[ 'institutionDetail' ][ 'country' ] = data[ 'institutionDetail' ][ 'country' ];
    this.currentItem[ 'institutionDetail' ][ 'countryState' ] = data[ 'institutionDetail' ][ 'countryState' ];
    this.currentItem[ 'institutionDetail' ][ 'zip' ] = data[ 'institutionDetail' ][ 'zip' ];

  }

  protected subscribeCountries(): void {

    this.countriesSubscription = this.countriesService.itemsList.subscribe( ( countries: any ) => {

      if ( countries.length ) {

        this.countriesOptions = countries;

        if ( this.statesOptions ) {

          this.checkView();

        }

      } else {

        this.countriesService.getSelectOptions();

      }

    } );

  }

  protected subscribeStates(): void {

    this.statesSubscription = this.statesService.itemsList.subscribe( ( states: any ) => {

      if ( states.length ) {

        this.statesOptions = states;

        if ( this.countriesOptions ) {

          this.checkView();

        }

      } else {

        this.statesService.getSelectOptions();

      }

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

    this.unSubscribeCountries();
    this.unSubscribeStates();
    this.unSubscribeConfirm();
    this.unSubscribeFg();

  }

  protected unSubscribeCountries(): void {

    if ( this.countriesSubscription && !this.countriesSubscription.closed ) {

      this.countriesSubscription.unsubscribe();

    }

  }

  protected unSubscribeStates(): void {

    if ( this.statesSubscription && !this.statesSubscription.closed ) {

      this.statesSubscription.unsubscribe();

    }

  }


  public openTab( tabName: string ) {

    this.generalErrorsCount = this.checkGroupErrors( 'general' );
    this.contactErrorsCount = this.checkGroupErrors( 'institutionDetail' );

    this.activeTab = tabName;

  }

}
