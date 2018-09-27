import {
  Component,
  Renderer2,
  ElementRef,
  OnDestroy,
  AfterViewInit,
  OnInit
}                                     from '@angular/core';

import { FilterTableComponent }       from '../../../filter-table/filter-table.component';

import { DataBindingService }         from '../../../../services/data.binding.service';
import { CurrenciesRequestsService }  from '../../../../services/main/settings/currencies-requests.service';
import { NotificationService }        from '../../../../services/notification.service';

import { FadeInOut }                  from '../../../../config/animations.config';
import { CurrenciesConfig }           from '../../../../config/currencies.config';


@Component( {
  selector: 'currencies',
  templateUrl: './currencies.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [ FadeInOut ]
} )
export class CurrenciesComponent extends FilterTableComponent implements OnDestroy, AfterViewInit, OnInit {

  protected listName: string = 'currencyList';

  public config = CurrenciesConfig;

  constructor ( protected itemsService: CurrenciesRequestsService,
                protected notificationService: NotificationService,
                protected dataBindingService: DataBindingService,
                public  elemHref: ElementRef,
                public renderer: Renderer2 ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

    this.hideSpinner();

  }

  public ngOnDestroy(): void {

    this.itemsService.requestDataSubject.next( {
      filterData: {
        status: '-1'
      },
      orderData: {
        name: 'code',
        direction: 0
      },
      searchData: ''
    } );

    this.itemsService.itemsList.next( [] );

  }

  public ngOnInit(): void {

    this.getStartData();
    this.getFilterData();

  }

}
