import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';

import { SingleComponent } from '../../../single/single.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';

import { InstitutionsSingleConfig } from '../../../../../config/institutions.config';
import { FadeInOut } from '../../../../../config/animations.config';
import { OverlayService } from '../../../../../services/overlay.service';


@Component( {
  selector: 'institution-single',
  templateUrl: './institution-single.component.html',
  styleUrls: [ './institution-single.component.scss' ],
  animations: [ FadeInOut ]
} )
export class InstitutionSingleComponent extends SingleComponent {

  protected pathAfterRemove: string[] = [ 'institutions' ];

  public config: object = InstitutionsSingleConfig;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: InstitutionsRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService );


  }

}
