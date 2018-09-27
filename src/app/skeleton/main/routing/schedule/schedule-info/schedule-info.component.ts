import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';

import { FilterTableComponent } from '../../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { SchedulesService } from '../../../../../services/main/routing/schedules.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { SchedulesConfig } from '../../../../../config/schedules.config';


@Component( {
  selector: 'schedule-info',
  templateUrl: './schedule-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class ScheduleInfoComponent extends FilterTableComponent {

  public config = SchedulesConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: SchedulesService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );


  }

}
