import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CreateEditComponent } from '../../../../create-edit/create-edit.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { SchedulesService } from '../../../../../services/main/routing/schedules.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { SchedulesCreateConfig } from '../../../../../config/schedules.config';


@Component({
  selector: 'schedule-create',
  templateUrl: './schedule-create.component.html',
  styleUrls: ['./schedule-create.component.scss'],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
})
export class ScheduleCreateComponent extends CreateEditComponent {

  public config = SchedulesCreateConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: SchedulesService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.hideSpinner();

  }

}
