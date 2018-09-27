import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Renderer2
}                                      from '@angular/core';

import { FilterTableComponent }        from '../../../filter-table/filter-table.component';

import { DeviceTypesRequestsService }  from '../../../../services/main/settings/device-types-requests.service';
import { DataBindingService }          from '../../../../services/data.binding.service';
import { NotificationService }         from '../../../../services/notification.service';

import { FadeInOut }                   from '../../../../config/animations.config';
import { DeviceTypesConfig }           from '../../../../config/device-types.config';


@Component( {
  selector: 'device-types',
  templateUrl: './device-types.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [ FadeInOut ]
} )
export class DeviceTypesComponent extends FilterTableComponent implements OnDestroy, OnInit {

  protected listName: string = 'deviceTypeList';

  public config = DeviceTypesConfig;

  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: DeviceTypesRequestsService,
               protected notificationService: NotificationService,
               protected elemHref: ElementRef,
               protected renderer: Renderer2 ) {

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
