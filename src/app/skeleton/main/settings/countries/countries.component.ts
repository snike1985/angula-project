import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2,
}                                    from '@angular/core';

import { FilterTableComponent }      from '../../../filter-table/filter-table.component';

import { NotificationService }       from '../../../../services/notification.service';
import { DataBindingService }        from '../../../../services/data.binding.service';
import { CountriesRequestsService }  from '../../../../services/main/settings/countries-requests.service';

import {
  FadeInOut,
  VisibilityChanged
}                                    from '../../../../config/animations.config';
import { CountriesConfig }           from '../../../../config/countries.config';


@Component( {
  selector: 'countries',
  templateUrl: './countries.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [ FadeInOut, VisibilityChanged ]
} )
export class CountriesComponent extends FilterTableComponent implements OnDestroy, OnInit, AfterViewInit  {

  protected listName: string = 'countryList';

  public config = CountriesConfig;

  constructor ( protected itemsService: CountriesRequestsService,
                protected notificationService: NotificationService,
                protected dataBindingService: DataBindingService,
                public  elemHref: ElementRef,
                public renderer: Renderer2 ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

    this.hideSpinner();

  }

  public ngOnDestroy(): void {

    this.itemsService.itemsList.next( [] );
    this.itemsService.requestDataSubject.next( {
      filterData: {
        status: '-1'
      },
      orderData: {
        name: 'countryName',
        direction: 0
      },
      searchData: ''
    } );


  }

  public ngOnInit(): void {

    this.getStartData();
    this.getFilterData();

  }

}
