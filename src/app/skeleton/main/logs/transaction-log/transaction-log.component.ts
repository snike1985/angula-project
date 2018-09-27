import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FilterTableComponent } from '../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../services/data.binding.service';
import { TransactionLogsService } from '../../../../services/main/logs/transaction-logs.service';
import { NotificationService } from '../../../../services/notification.service';
import { MerchantsRequestsService } from '../../../../services/main/institutions/merchants-requests.service';
import { LocationsRequestsService } from '../../../../services/main/institutions/locations-requests.service';
import { InstitutionsRequestsService } from '../../../../services/main/institutions/institutions-requests.service';
import { DeviceTypesRequestsService } from '../../../../services/main/settings/device-types-requests.service';
import { CurrenciesRequestsService } from '../../../../services/main/settings/currencies-requests.service';

import { TransactionLogsConfig } from '../../../../config/transaction-log.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../config/animations.config';

import { SelectOptions } from '../../../../interfaces/select-options';


@Component( {
  selector: 'transaction-log',
  templateUrl: './transaction-log.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class TransactionLogComponent extends FilterTableComponent implements OnDestroy {

  private typesSubscription: Subscription;
  private institutionsSubscription: Subscription;
  private merchantsSubscription: Subscription;
  private locationsSubscription: Subscription;
  private currenciesOptionsSubscription: Subscription;
  private statusesSubscription: Subscription;
  private transactionOrtionsSubscription: Subscription;

  protected listName: string = 'logsList';

  public config = TransactionLogsConfig;
  public countries: Object[];
  public forReview: number = 0;
  public institutionsOptions: any[];
  public merchantsOptions: any[];
  public locationsOptions: any[];
  public statuses: any[];
  public currenciesOptions: any[];
  public transactionOrtions: any[];
  public typesOptions: SelectOptions[];


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: TransactionLogsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    private deviceTypesService: DeviceTypesRequestsService,
    private currenciesService: CurrenciesRequestsService,
    private institutionsService: InstitutionsRequestsService,
    private locationsService: LocationsRequestsService,
    private merchantsService: MerchantsRequestsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }

  private cardOptionsSubscription: Subscription;
  private cardOptions: any;

  private subscribeCardOptions(): void {

    this.cardOptionsSubscription = this.itemsService.cardsOptions.subscribe( ( cardOptions: any ) => {

      if ( cardOptions.length ) {

        this.cardOptions = cardOptions;

        this.updateFilter( 'cardType', this.cardOptions );


      } else {

        this.itemsService.getCardOptions();

      }


    } );

  }



  private subscribeCurrenciesOptions(): void {

    this.currenciesOptionsSubscription = this.currenciesService.itemsList.subscribe( ( currenciesOptions: any ) => {

      if ( currenciesOptions.length ) {

        this.currenciesOptions = currenciesOptions;

        this.updateFilter( 'currency', this.currenciesOptions );


      } else {

        this.currenciesService.getSelectOptions();

      }

    } );

  }

  private subscribeInstitutions(): void {

    this.institutionsSubscription = this.institutionsService.itemsList.subscribe( ( institutions: any ) => {

      if ( institutions.length ) {

        this.institutionsOptions = institutions;

        this.updateFilter( 'institution', this.institutionsOptions );


      } else {

        this.institutionsService.getSelectOptions();

      }

    } );

  }

  private subscribeLocations(): void {

    this.locationsSubscription = this.locationsService.itemsList.subscribe( ( locations: any ) => {

      if ( locations.length ) {

        this.locationsOptions = locations;

        this.updateFilter( 'location', this.locationsOptions );


      } else {

        this.locationsService.getSelectOptions();

      }


    } );

  }

  private subscribeMerchants(): void {

    this.merchantsSubscription = this.merchantsService.itemsList.subscribe( ( merchants: any ) => {

      if ( merchants.length ) {

        this.merchantsOptions = merchants;

        this.updateFilter( 'merchant', this.merchantsOptions );


      } else {

        this.merchantsService.getSelectOptions();

      }

    } );

  }

  private subscribeTransactionOptions(): void {

    this.transactionOrtionsSubscription = this.itemsService.transactionOptions.subscribe( ( transactionOrtions: any ) => {

      if ( transactionOrtions.length ) {

        this.transactionOrtions = transactionOrtions;

        this.updateFilter( 'transaction', this.transactionOrtions );


      } else {

        this.itemsService.getTransactionOptions();

      }

    } );

  }

  private subscribeTypes(): void {

    this.typesSubscription = this.deviceTypesService.itemsList.subscribe( ( types: any ) => {

      if ( types.length ) {

        this.typesOptions = types;

        this.updateFilter( 'device', this.typesOptions );


      } else {

        this.deviceTypesService.getSelectOptions();

      }

    } );

  }

  private subscribeStatuses(): void {

    this.statusesSubscription = this.itemsService.statusOptions.subscribe( ( statuses: any ) => {

      if ( statuses.length ) {

        this.statuses = statuses;

        this.updateFilter( 'status', this.statuses );


      } else {

        this.itemsService.getStatusOptions();

      }

    } );

  }

  private unSubscribeCardOptions(): void {

    if ( this.cardOptionsSubscription && !this.cardOptionsSubscription.closed ) {

      this.cardOptionsSubscription.unsubscribe();

    }

  }

  private unSubscribeCurrenciesOptions(): void {

    if ( this.currenciesOptionsSubscription && !this.currenciesOptionsSubscription.closed ) {

      this.currenciesOptionsSubscription.unsubscribe();

    }

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

  private unSubscribeStatuses(): void {

    if ( this.statusesSubscription && !this.statusesSubscription.closed ) {

      this.statusesSubscription.unsubscribe();

    }

  }

  private unSubscribeTransactionOptions(): void {

    if ( this.transactionOrtionsSubscription && !this.transactionOrtionsSubscription.closed ) {

      this.transactionOrtionsSubscription.unsubscribe();

    }

  }

  private unSubscribeTypes(): void {

    if ( this.typesSubscription && !this.typesSubscription.closed ) {

      this.typesSubscription.unsubscribe();

    }

  }


  protected getFilterData(): void {

    this.setFilterLanguage();

    this.subscribeInstitutions();

    this.subscribeMerchants();

    this.subscribeLocations();

    this.subscribeTypes();

    this.subscribeCurrenciesOptions();

    this.subscribeStatuses();

    this.subscribeTransactionOptions();

    this.subscribeCardOptions();

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

    this.unSubscribeInstitutions();
    this.unSubscribeMerchants();
    this.unSubscribeLocations();
    this.unSubscribeTypes();
    this.unSubscribeCurrenciesOptions();
    this.unSubscribeStatuses();
    this.unSubscribeTransactionOptions();
    this.unSubscribeCardOptions();

  }


  public ngOnDestroy(): void {

    this.itemsService.requestDataSubject.next( {
      filterData: {
        transaction: '-1',
        status: '-1',
        period: '-1',
        forReview: false,
        institution: '-1',
        merchant: '-1',
        location: '-1',
        device: '-1',
        cardType: '-1',
        amount: '-1',
        currency: '-1'
      },
      orderData: {
        name: 'date',
        direction: 0
      },
      searchData: ''
    } );

    this.itemsService.itemsList.next( [] );
    this.deviceTypesService.itemsList.next( [] );
    this.institutionsService.itemsList.next( [] );
    this.merchantsService.itemsList.next( [] );
    this.locationsService.itemsList.next( [] );

  }

}
