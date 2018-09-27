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
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { LocationsSingleConfig } from '../../../../../config/locations.config';

@Component({
  selector: 'location-single',
  templateUrl: './location-single.component.html',
  styleUrls: ['./location-single.component.scss'],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
})
export class LocationSingleComponent extends SingleComponent {

  protected pathAfterRemove: string[] = [ 'institutions', 'locations' ];

  public config: object = LocationsSingleConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: LocationsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService );


  }


  public askToDelete( e ): void {

    e.preventDefault();

    this.subscribeConfirm();

    this.overlayService.activePopup$.next( 'LocationDeleteComponent' );

  }

}
