import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ActivatedRoute } from '@angular/router';

import { InstitutionsAddressComponent } from '../../institutions-address/institutions-address.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { NotificationService } from '../../../../../services/notification.service';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';

import { LocationsConfig } from '../../../../../config/locations.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';


@Component( {
  selector: 'locations-info',
  templateUrl: './locations-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class LocationsInfoComponent extends InstitutionsAddressComponent {

  private institutionsSubscription: Subscription;
  private merchantsSubscription: Subscription;

  protected listName: string = 'locationList';

  public config = LocationsConfig;
  public institutionsOptions: any[];
  public merchantsOptions: any[];
  public locationDataView: boolean = true;


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LocationsRequestsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    private overlayService: OverlayService,
    private institutionsService: InstitutionsRequestsService,
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

  private unSubscribeMerchants(): void {

    if ( this.merchantsSubscription && !this.merchantsSubscription.closed ) {

      this.merchantsSubscription.unsubscribe();

    }

  }


  protected getFilterData(): void {

    this.setFilterLanguage();

    this.subscribeAddress();

    this.subscribeInstitutions();

    this.subscribeMerchants();

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

  }


  public import(): void {

    this.overlayService.activePopup$.next( 'InstitutionsImportComponent' );

  }

  public dataView(): void {

    this.locationDataView = !this.locationDataView;

  }

}
