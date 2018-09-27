import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Location } from '@angular/common';

import { FilterTableComponent } from '../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../services/data.binding.service';
import { CountryStatesRequestsService } from '../../../../services/main/settings/country-states-requests.service';
import { NotificationService } from '../../../../services/notification.service';
import { CountriesRequestsService } from '../../../../services/main/settings/countries-requests.service';

import { CountryStatesConfig } from '../../../../config/country-states.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../config/animations.config';
import { Country } from '../../../../interfaces/country';
import { SelectOptions } from '../../../../interfaces/select-options';

@Component( {
  selector: 'country-state',
  templateUrl: './country-states.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class CountryStatesComponent extends FilterTableComponent implements OnDestroy {

  private countriesSubscription;

  protected listName: string = 'stateList';

  public config = CountryStatesConfig;
  public countries: any;


  constructor( private countriesService: CountriesRequestsService,
    protected itemsService: CountryStatesRequestsService,
    protected notificationService: NotificationService,
    protected dataBindingService: DataBindingService,
    public  elemHref: ElementRef,
    public renderer: Renderer2 ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }


  private subscribeCountries(): void {

    this.countriesSubscription = this.countriesService.itemsList.subscribe( ( countries: SelectOptions[] ) => {

      console.log( countries );

      if ( countries.length ) {

        this.countries = countries;

        this.updateFilter( 'country', this.countries );

      } else {

        this.countriesService.getSelectOptions();

      }

    } );

  }

  private unSubscribeCountries(): void {

    if ( this.countriesSubscription && !this.countriesSubscription.closed ) {

      this.countriesSubscription.unsubscribe();

    }

  }


  protected getFilterData(): void {

    this.setFilterLanguage();
    this.subscribeCountries();

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

    this.unSubscribeCountries();

  }


  public ngOnDestroy(): void {

    this.clearAllItems();

    this.unsubscribeAll();

    this.itemsService.requestDataSubject.next( {
      filterData: {
        status: '-1',
        country: '-1'
      },
      orderData: {
        name: 'stateName',
        direction: 0
      },
      searchData: ''
    } );

    this.itemsService.itemsList.next( [] );

    this.countriesService.itemsList.next( [] );

  }

}
