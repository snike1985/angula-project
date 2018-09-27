import {
    Component,
    ElementRef,
    Renderer2
} from '@angular/core';
import {
    FadeInOut,
    TabsAnimation,
    VisibilityChanged
} from '../../../../../config/animations.config';
import {InstitutionCommonCreateComponent} from '../../institution-common-create/institution-common-create.component';
import {Subscription} from 'rxjs/Subscription';
import {LocationsCreateConfig} from '../../../../../config/locations.config';
import {DataBindingService} from '../../../../../services/data.binding.service';
import {LocationsRequestsService} from '../../../../../services/main/institutions/locations-requests.service';
import {NotificationService} from '../../../../../services/notification.service';
import {Router} from '@angular/router';
import {OverlayService} from '../../../../../services/overlay.service';
import {CountriesRequestsService} from '../../../../../services/main/settings/countries-requests.service';
import {CountryStatesRequestsService} from '../../../../../services/main/settings/country-states-requests.service';
import {InstitutionsRequestsService} from '../../../../../services/main/institutions/institutions-requests.service';
import {MerchantsRequestsService} from '../../../../../services/main/institutions/merchants-requests.service';
import {
    FormControl,
    FormGroup,
    Validators
} from '@angular/forms';
import { SelectOptions } from '../../../../../interfaces/select-options';
import { Location } from '@angular/common';
import { GMapsService } from '../../../../../services/main/institutions/locations-geocoding.service';

@Component({
    selector: 'location-create',
    templateUrl: './location-create.component.html',
    styleUrls: ['./location-create.component.scss'],
    animations: [
        VisibilityChanged,
        FadeInOut,
        TabsAnimation
    ]
})
export class LocationCreateComponent extends InstitutionCommonCreateComponent {

  protected pathAfterRemove: string[] = [ 'institutions' , 'locations'];
  protected statesSubscription: Subscription;
  protected countriesSubscription: Subscription;
  private institutionSubscription: Subscription;
  private merchantsSubscription: Subscription;

    public config: object = LocationsCreateConfig;
    public currentItem: Object = {
        id: null,
        code: null,
        name: '',
        description: '',
        activateOn: null,
        expiryOn: null,
        status: false,
        merchant: null,
        institution: null,
        locationDetail: {
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
    public institutionsOptions: SelectOptions[];
    public merchantsOptions: SelectOptions[];


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: LocationsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,private countriesService: CountriesRequestsService,
    private merchantService: MerchantsRequestsService,
    private institutionsService: InstitutionsRequestsService,
    private statesService: CountryStatesRequestsService ,
                private geoservice: GMapsService) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService , location);

        this.subscribeCountries();
        this.subscribeStates();
        this.subscribeMerchants();
        this.subscribeInstitution();
    }


    private subscribeMerchants(): void {

        this.merchantsSubscription = this.merchantService.itemsList.subscribe((merchants: any) => {

            if (merchants.length) {

                this.merchantsOptions = merchants;

                if (this.institutionsOptions && this.countriesOptions && this.statesOptions) {

                    this.checkView();

                }

            } else {

                this.merchantService.getSelectOptions();

            }

        });

    }

    private subscribeInstitution(): void {

        this.institutionSubscription = this.institutionsService.itemsList.subscribe((institution: any) => {

            if (institution.length) {

                this.institutionsOptions = institution;

                if (this.merchantsOptions && this.countriesOptions && this.statesOptions) {

                    this.checkView();

                }

            } else {

                this.institutionsService.getSelectOptions();

            }

        });

    }

    private unSubscribeMerchants(): void {

        if (this.merchantsSubscription && !this.merchantsSubscription.closed) {

            this.merchantsSubscription.unsubscribe();

        }

    }

    private unSubscribeInstitution(): void {

        if (this.institutionSubscription && !this.institutionSubscription.closed) {

            this.institutionSubscription.unsubscribe();

        }

    }

    public create(value): void {

        this.loading = true;

        const curentCountry = this.countriesOptions.filter((currentValue) => {
            if (currentValue['value'] === value['locationDetail']['country']) {
                return currentValue
            }
        })[0]['text'];

        const currentAddress = curentCountry + ' ' + value['locationDetail']['city'] + ' ' + value['locationDetail']['address1'] + ' ' + value['locationDetail']['address2'];

        const self = this;

        this.geoservice.getGeocoding(currentAddress).subscribe(function (x) {
            let currentCoordinatesObj: Object = {};

            if ( x != null ) {
                const currentCoordinates = x.toString().substr(1, x.toString().length - 2).split(', ');
                currentCoordinatesObj = {
                    lat: currentCoordinates[0],
                    lng: currentCoordinates[1]
                };
            } else {
                currentCoordinatesObj = {
                    lat: null,
                    lng: null
                };
            }

            self.currentItem['coordinates'] = currentCoordinatesObj;

            self.setData( value );

            self.insertData();
        });
    }

    public edit(value): void {

        this.loading = true;

        const curentCountry = this.countriesOptions.filter((currentValue) => {
            if (currentValue['value'] === value['locationDetail']['country']) {
                return currentValue
            }
        })[0]['text'];

        const currentAddress = curentCountry + ' ' + value['locationDetail']['city'] + ' ' + value['locationDetail']['address1'] + ' ' + value['locationDetail']['address2'];

        const self = this;

        this.geoservice.getGeocoding(currentAddress).subscribe(function (x) {
            let currentCoordinatesObj: Object = {};

            if ( x != null ) {
                const currentCoordinates = x.toString().substr(1, x.toString().length - 2).split(', ');
                currentCoordinatesObj = {
                    lat: currentCoordinates[0],
                    lng: currentCoordinates[1]
                };
            } else {
                currentCoordinatesObj = {
                    lat: null,
                    lng: null
                };
            }

            self.currentItem['coordinates'] = currentCoordinatesObj;

            self.setData( value );

            self.updateData();
        });
    }

    private updateData(): void {

        console.log(this.currentItem);
        this.itemsService.send( 'update', this.currentItem, this.currentItem[ 'id' ] )
            .subscribe( res => {

                let data = res.json();

                if ( data[ 'status' ] === 'failure' ) {

                    this.notification.errorNotify( `${ data[ 'message' ] }` );

                } else {

                    this.notification.successNotify( `${ data[ 'message' ] }` );

                }

                this.loading = false;

            } );
    }

    private insertData(): void {

        console.log(this.currentItem);
        this.itemsService.send( 'insert', this.currentItem )
            .subscribe( res => {

                let data = res.json();

                if ( data[ 'status' ] === 'failure' ) {

                    this.notification.errorNotify( `${ data[ 'message' ] }` );

                } else {

                    let path = this.pathAfterRemove.concat( [
                        data[ 'data' ][ 'id' ],
                        'edit'
                    ] );


                    this.router.navigate( path );
                    this.notification.successNotify( `${ data[ 'message' ] }` );

                }

                this.loading = false;

            } );
    }

    protected createFormGroup(): void {

        let country = ( this.currentItem['locationDetail']['country'] ) ? this.currentItem['locationDetail']['country'] : this.countriesOptions[0]['value'],
            state = ( this.currentItem['locationDetail']['state'] ) ? this.currentItem['locationDetail']['state'] : this.statesOptions[0]['value'],
            institution = ( this.currentItem['institution'] ) ? this.currentItem['institution']['id'] : this.institutionsOptions[0]['value'],
            merchant = ( this.currentItem['merchant'] ) ? this.currentItem['merchant']['id'] : this.merchantsOptions[0]['value'];

        this.activateOnControl = new FormControl(this.currentItem['activateOn'], Validators.required);
        this.expiryOnControl = new FormControl(this.currentItem['expiryOn'], Validators.required);

        this.fg = new FormGroup({
            general: new FormGroup({
                name: new FormControl(this.currentItem['name'], Validators.required),
                description: new FormControl(this.currentItem['description']),
                activateOn: this.activateOnControl,
                expiryOn: this.expiryOnControl,
                institution: new FormControl(institution),
                merchant: new FormControl(merchant),
                status: new FormControl(false)
            }),
            locationDetail: new FormGroup({
                email: new FormControl(this.currentItem['locationDetail']['email'], [this.dynamicEmailValidator.bind(this)]),
                phone: new FormControl(this.currentItem['locationDetail']['phone']),
                fax: new FormControl(this.currentItem['locationDetail']['fax']),
                address1: new FormControl(this.currentItem['locationDetail']['address1']),
                address2: new FormControl(this.currentItem['locationDetail']['address2']),
                city: new FormControl(this.currentItem['locationDetail']['city']),
                country: new FormControl(country),
                countryState: new FormControl(state),
                zip: new FormControl(this.currentItem['locationDetail']['zip'])
            })
        });

        this.fgSubscription = this.fg.valueChanges.subscribe(data => {

      this.generalErrorsCount = this.checkGroupErrors(  'general'  );
      this.contactErrorsCount = this.checkGroupErrors(  'locationDetail'  );

        });

        this.subscribeDateControls();

    this.startData = this.fg.value;this.hideSpinner();

    }

    protected setData(data: Object): void {

        this.currentItem['name'] = data['general']['name'];
        this.currentItem['description'] = data['general']['description'];
        this.currentItem['activateOn'] = data['general']['activateOn'];
        this.currentItem['expiryOn'] = data['general']['expiryOn'];
        this.currentItem['merchant'] = data['general']['merchant'];
        this.currentItem['institution'] = data['general']['institution'];

        this.currentItem['locationDetail']['email'] = data['locationDetail']['email'];
        this.currentItem['locationDetail']['phone'] = data['locationDetail']['phone'];
        this.currentItem['locationDetail']['fax'] = data['locationDetail']['fax'];
        this.currentItem['locationDetail']['address1'] = data['locationDetail']['address1'];
        this.currentItem['locationDetail']['address2'] = data['locationDetail']['address2'];
        this.currentItem['locationDetail']['city'] = data['locationDetail']['city'];
        this.currentItem['locationDetail']['country'] = data['locationDetail']['country'];
        this.currentItem['locationDetail']['countryState'] = data['locationDetail']['countryState'];
        this.currentItem['locationDetail']['zip'] = data['locationDetail']['zip'];

    }



  protected subscribeCountries(): void {

        this.countriesSubscription = this.countriesService.itemsList.subscribe((countries: any) => {

            if (countries.length && this.merchantsOptions && this.institutionsOptions) {

                this.countriesOptions = countries;

                if (this.statesOptions) {

                    this.checkView();

                }

            } else {

                this.countriesService.getSelectOptions();

            }

        });

    }

    protected subscribeStates(): void {

        this.statesSubscription = this.statesService.itemsList.subscribe((states: any) => {

            if (states.length) {

                this.statesOptions = states;

                if (this.countriesOptions && this.merchantsOptions && this.institutionsOptions) {

                    this.checkView();

                }

            } else {

                this.statesService.getSelectOptions();

            }

        });

    }

    protected unsubscribeAll(): void {

        this.globalSettingsSubscription.unsubscribe();

        if (this.scrollSubscription) {

            this.scrollSubscription.unsubscribe();

        }

        this.view.unsubscribe();

        if (this.tableDataSubscription) {

            this.tableDataSubscription.unsubscribe();

        }

        this.unSubscribeCountries();
        this.unSubscribeStates();
        this.unSubscribeConfirm();
        this.unSubscribeFg();
        this.unSubscribeMerchants();
        this.unSubscribeInstitution();

    }

    protected unSubscribeCountries(): void {

        if (this.countriesSubscription && !this.countriesSubscription.closed) {

            this.countriesSubscription.unsubscribe();

        }

    }

    protected unSubscribeStates(): void {

        if (this.statesSubscription && !this.statesSubscription.closed) {

            this.statesSubscription.unsubscribe();

        }

    }


    public openTab(tabName: string) {

    this.generalErrorsCount = this.checkGroupErrors(  'general'  );
    this.contactErrorsCount = this.checkGroupErrors(  'locationDetail'  );

        this.activeTab = tabName;

    }

}
