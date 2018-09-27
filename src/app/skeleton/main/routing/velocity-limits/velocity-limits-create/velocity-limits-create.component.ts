import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';

import { CreateEditComponent } from '../../../../create-edit/create-edit.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { VelocityLimitsService } from '../../../../../services/main/routing/velocity-limits.service';
import { NotificationService } from '../../../../../services/notification.service';
import { OverlayService } from '../../../../../services/overlay.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { VelocityLimitsCreateConfig } from '../../../../../config/velocity-limits.config';
import { Location } from '@angular/common';


@Component( {
  selector: 'velocity-limits-create',
  templateUrl: './velocity-limits-create.component.html',
  styleUrls: [ './velocity-limits-create.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class VelocityLimitsCreateComponent extends CreateEditComponent {

  public config = VelocityLimitsCreateConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: VelocityLimitsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.hideSpinner();

  }

}
