import { Component, ElementRef, Renderer2 } from '@angular/core';
import { DataBindingService }               from '../../../../../services/data.binding.service';

import { DevicesRequestsService }           from '../../../../../services/main/institutions/devices-requests.service';
import { NotificationService }              from '../../../../../services/notification.service';
import { OverlayService }                   from '../../../../../services/overlay.service';

import { FadeInOut, VisibilityChanged }     from '../../../../../config/animations.config';
import { DevicesConfig }                    from '../../../../../config/devices.config';
import { InstitutionsAddressComponent } from '../../institutions-address/institutions-address.component';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';

@Component({
  selector: 'devices-info',
  templateUrl: './devices-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
})
export class DevicesInfoComponent extends InstitutionsAddressComponent {

  private institutionsSubscription: Subscription;
  private merchantsSubscription: Subscription;
  private locationsSubscription: Subscription;

  protected listName: string = 'devicesList';

  public config = DevicesConfig;
  public institutionsOptions: any[];
  public merchantsOptions: any[];
  public locationsOptions: any[];


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: DevicesRequestsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    private overlayService: OverlayService,
    private institutionsService: InstitutionsRequestsService,
    private locationsService: LocationsRequestsService,
    private merchantsService: MerchantsRequestsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer, route );

    this.subscribeQueryParams();

  }


  private subscribeInstitutions(): void {

    this.institutionsSubscription = this.institutionsService.itemsList.subscribe( ( institutions: any ) => {

      if ( institutions.length ) {

        this.institutionsOptions = institutions;

        this.updateFilter( 'institutions', this.institutionsOptions );


      } else {

        this.institutionsService.getSelectOptions();

      }

    } );

  }

  private subscribeLocations(): void {

    this.locationsSubscription = this.locationsService.itemsList.subscribe( ( locations: any ) => {

      if ( locations.length ) {

        this.locationsOptions = locations;

        this.updateFilter( 'locations', this.locationsOptions );


      } else {

        this.locationsService.getSelectOptions();

      }


    } );

  }

  private subscribeMerchants(): void {

    this.merchantsSubscription = this.merchantsService.itemsList.subscribe( ( merchants: any ) => {

      if ( merchants.length ) {

        this.merchantsOptions = merchants;

        this.updateFilter( 'merchants', this.merchantsOptions );


      } else {

        this.merchantsService.getSelectOptions();

      }

    } );

  }

  private unSubscribeInstitutions(): void {

    if ( this.institutionsSubscription && !this.institutionsSubscription.closed ) {

      this.institutionsSubscription.unsubscribe();

    }

  }

  private unSubscribeLocations(): void {

    if ( this.locationsSubscription && !this.locationsSubscription.closed ) {

      this.locationsSubscription.unsubscribe();

    }

  }

  private unSubscribeMerchants(): void {

    if ( this.merchantsSubscription && !this.merchantsSubscription.closed ) {

      this.merchantsSubscription.unsubscribe();

    }

  }


  protected getFilterData(): void {

    this.setFilterLanguage();

    this.subscribeInstitutions();

    this.subscribeMerchants();

    this.subscribeLocations();

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.unSubscribeAddress();

    this.view.unsubscribe();

    this.unSubscribeInstitutions();
    this.unSubscribeMerchants();
    this.unSubscribeLocations()

  }


  public import(): void {

    this.overlayService.activePopup$.next( 'InstitutionsImportComponent' );

  }

}