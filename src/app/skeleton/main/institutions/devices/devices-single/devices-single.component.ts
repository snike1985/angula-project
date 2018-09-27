import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';

import { SingleComponent } from '../../../single/single.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { DevicesRequestsService } from '../../../../../services/main/institutions/devices-requests.service';

import {
  FadeInOut
} from '../../../../../config/animations.config';
import { DevicesSingleConfig } from '../../../../../config/devices.config';


@Component({
  selector: 'devices-single',
  templateUrl: './devices-single.component.html',
  styleUrls: ['./devices-single.component.scss'],
  animations: [ FadeInOut ]
})
export class DevicesSingleComponent extends SingleComponent {

  protected pathAfterRemove: string[] = [ 'institutions', 'devices' ];

  public config: object = DevicesSingleConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: DevicesRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService );


  }


  public askToDelete( e ): void {

    e.preventDefault();

    this.subscribeConfirm();

    this.overlayService.activePopup$.next( 'DeviceDeleteComponent' );

  }

}
