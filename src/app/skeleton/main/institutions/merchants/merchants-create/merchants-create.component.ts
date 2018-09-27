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

import { InstitutionCommonCreateComponent } from '../../institution-common-create/institution-common-create.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { CountriesRequestsService } from '../../../../../services/main/settings/countries-requests.service';
import { CountryStatesRequestsService } from '../../../../../services/main/settings/country-states-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';

import {
  FadeInOut,
  TabsAnimation,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { MerchantsCreateConfig } from '../../../../../config/merchants.config';
import { SelectOptions } from '../../../../../interfaces/select-options';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';


@Component( {
  selector: 'merchants-create',
  templateUrl: './merchants-create.component.html',
  styleUrls: [ './merchants-create.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut,
    TabsAnimation
  ]
} )
export class MerchantsCreateComponent extends InstitutionCommonCreateComponent {

  private institutionSubscription: Subscription;
  private categoriesSubscription: Subscription;
  private statesSubscription: Subscription;
  private countriesSubscription: Subscription;

  protected pathAfterRemove: string[] = [
    'institutions',
    'merchants'
  ];

  public config: object = MerchantsCreateConfig;
  public institutionsOptions: SelectOptions[];
  public categoriesOptions: SelectOptions[];
  public currentItem: Object = {
    id: null,
    code: null,
    name: '',
    institution: null,
    description: '',
    activateOn: null,
    expiryOn: null,
    status: false,
    merchantDetail: {
      email: '',
      phone: '',
      fax: '',
      address1: '',
      address2: '',
      city: '',
      country: null,
      countryState: null,
      zip: ''
    },
    options: {
      category: null,
      partial_auth: false,
      services: {
        authService: false,
        prepaidService: false
      },
      additional_services: {
        fraudService: false,
        loyaltyService: false
      }
    }
  };


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: MerchantsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,
    private countriesService: CountriesRequestsService,
    private statesService: CountryStatesRequestsService,
    private institutionsService: InstitutionsRequestsService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.subscribeInstitution();
    this.subscribeCategories();
    this.subscribeCountries();
    this.subscribeStates();
  }


  private subscribeCategories(): void {

    this.categoriesSubscription = this.itemsService.categoriesList.subscribe( ( categories: any ) => {

      if ( categories.length ) {

        this.categoriesOptions = categories;

        if ( this.countriesOptions && this.statesOptions && this.institutionsOptions ) {

          this.checkView();

        }

      } else {

        this.itemsService.getCategories();

      }


    } );

  }

  private unSubscribeCategories(): void {

    if ( this.categoriesSubscription && !this.categoriesSubscription.closed ) {

      this.categoriesSubscription.unsubscribe();

    }

  }

  private subscribeInstitution(): void {

    this.institutionSubscription = this.institutionsService.itemsList.subscribe( ( institution: any ) => {

      if ( institution.length ) {

        this.institutionsOptions = institution;

        if ( this.countriesOptions && this.statesOptions && this.categoriesOptions ) {

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

    let country = ( this.currentItem[ 'merchantDetail' ][ 'country' ] ) ? this.currentItem[ 'merchantDetail' ][ 'country' ] : this.countriesOptions[ 0 ][ 'value' ],
      state = ( this.currentItem[ 'merchantDetail' ][ 'state' ] ) ? this.currentItem[ 'merchantDetail' ][ 'state' ] : this.statesOptions[ 0 ][ 'value' ],
      institution = ( this.currentItem[ 'merchantDetail' ][ 'institution' ] ) ? this.currentItem[ 'merchantDetail' ][ 'institution' ] : this.institutionsOptions[ 0 ][ 'value' ],
      category = ( this.currentItem[ 'options' ][ 'category' ] ) ? this.currentItem[ 'options' ][ 'category' ] : this.categoriesOptions[ 0 ][ 'value' ];

    this.activateOnControl = new FormControl( this.currentItem[ 'activateOn' ], Validators.required );
    this.expiryOnControl = new FormControl( this.currentItem[ 'expiryOn' ], Validators.required );

    this.fg = new FormGroup( {
      general: new FormGroup( {
        name: new FormControl( this.currentItem[ 'name' ], Validators.required ),
        description: new FormControl( this.currentItem[ 'description' ] ),
        institution: new FormControl( institution ),
        activateOn: this.activateOnControl,
        expiryOn: this.expiryOnControl,
        status: new FormControl( false )
      } ),
      options: new FormGroup( {
        category: new FormControl( category ),
        partialAuth: new FormControl( this.currentItem[ 'options' ][ 'partial_auth' ] ),
        authService: new FormControl( this.currentItem[ 'options' ][ 'services' ][ 'authService' ] ),
        prepaidService: new FormControl( this.currentItem[ 'options' ][ 'services' ][ 'prepaidService' ] ),
        fraudService: new FormControl( this.currentItem[ 'options' ][ 'additional_services' ][ 'fraudService' ] ),
        loyaltyService: new FormControl( this.currentItem[ 'options' ][ 'additional_services' ][ 'loyaltyService' ] )
      } ),
      merchantDetail: new FormGroup( {
        email: new FormControl( this.currentItem[ 'merchantDetail' ][ 'email' ], [ this.dynamicEmailValidator.bind( this ) ] ),
        phone: new FormControl( this.currentItem[ 'merchantDetail' ][ 'phone' ] ),
        fax: new FormControl( this.currentItem[ 'merchantDetail' ][ 'fax' ] ),
        address1: new FormControl( this.currentItem[ 'merchantDetail' ][ 'address1' ] ),
        address2: new FormControl( this.currentItem[ 'merchantDetail' ][ 'address2' ] ),
        city: new FormControl( this.currentItem[ 'merchantDetail' ][ 'city' ] ),
        country: new FormControl( country ),
        countryState: new FormControl( state ),
        zip: new FormControl( this.currentItem[ 'merchantDetail' ][ 'zip' ] )
      } )
    } );

    this.fgSubscription = this.fg.valueChanges.subscribe( data => {

      this.generalErrorsCount = this.checkGroupErrors( 'general' );
      this.optionErrorsCount = this.checkGroupErrors( 'options' );
      this.contactErrorsCount = this.checkGroupErrors( 'merchantDetail' );

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

    this.currentItem[ 'merchantDetail' ][ 'email' ] = data[ 'merchantDetail' ][ 'email' ];
    this.currentItem[ 'merchantDetail' ][ 'phone' ] = data[ 'merchantDetail' ][ 'phone' ];
    this.currentItem[ 'merchantDetail' ][ 'fax' ] = data[ 'merchantDetail' ][ 'fax' ];
    this.currentItem[ 'merchantDetail' ][ 'address1' ] = data[ 'merchantDetail' ][ 'address1' ];
    this.currentItem[ 'merchantDetail' ][ 'address2' ] = data[ 'merchantDetail' ][ 'address2' ];
    this.currentItem[ 'merchantDetail' ][ 'city' ] = data[ 'merchantDetail' ][ 'city' ];
    this.currentItem[ 'merchantDetail' ][ 'country' ] = data[ 'merchantDetail' ][ 'country' ];
    this.currentItem[ 'merchantDetail' ][ 'countryState' ] = data[ 'merchantDetail' ][ 'countryState' ];
    this.currentItem[ 'merchantDetail' ][ 'zip' ] = data[ 'merchantDetail' ][ 'zip' ];

    this.currentItem[ 'options' ][ 'partial_auth' ] = data[ 'options' ][ 'partialAuth' ];
    this.currentItem[ 'options' ][ 'category' ] = data[ 'options' ][ 'category' ];
    this.currentItem[ 'options' ][ 'services' ][ 'authService' ] = data[ 'options' ][ 'authService' ];
    this.currentItem[ 'options' ][ 'services' ][ 'prepaidService' ] = data[ 'options' ][ 'prepaidService' ];
    this.currentItem[ 'options' ][ 'additional_services' ][ 'fraudService' ] = data[ 'options' ][ 'fraudService' ];
    this.currentItem[ 'options' ][ 'additional_services' ][ 'loyaltyService' ] = data[ 'options' ][ 'loyaltyService' ];

  }

  protected subscribeCountries(): void {

    this.countriesSubscription = this.countriesService.itemsList.subscribe( ( countries: any ) => {

      if ( countries.length ) {

        this.countriesOptions = countries;

        if ( this.statesOptions && this.institutionsOptions && this.categoriesOptions ) {

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

        if ( this.countriesOptions && this.institutionsOptions && this.categoriesOptions ) {

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
    this.unSubscribeInstitution();
    this.unSubscribeCategories()

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
    this.optionErrorsCount = this.checkGroupErrors( 'options' );
    this.contactErrorsCount = this.checkGroupErrors( 'merchantDetail' );

    this.activeTab = tabName;

  }

}
