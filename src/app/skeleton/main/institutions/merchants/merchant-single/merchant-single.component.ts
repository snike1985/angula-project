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
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';

import { MerchantsSingleConfig } from '../../../../../config/merchants.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';


@Component( {
  selector: 'merchant-single',
  templateUrl: './merchant-single.component.html',
  styleUrls: [ './merchant-single.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class MerchantSingleComponent extends SingleComponent {

  protected pathAfterRemove: string[] = [
    'institutions',
    'merchants'
  ];

  public config: object = MerchantsSingleConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: MerchantsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService );


  }

  public askToDelete( e ): void {

    e.preventDefault();

    this.subscribeConfirm();

    this.overlayService.activePopup$.next( 'MerchantDeleteComponent' );

  }

  public getServicesNames( services ): string {

    let servicesString = '';

    for ( let serviceKey in services ) {

      if ( services[ serviceKey ] ) {

        if ( servicesString === '' ) {

          servicesString += this.texts[ serviceKey ];

        } else {

          servicesString += `, ${ this.texts[ serviceKey ] }`;

        }

      }

    }

    return servicesString;

  }

}
