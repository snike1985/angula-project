import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';


import { DataBindingService } from '../../../../../services/data.binding.service';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { NotificationService } from '../../../../../services/notification.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { InstitutionsConfig } from '../../../../../config/institutions.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { InstitutionsAddressComponent } from '../../institutions-address/institutions-address.component';
import { ActivatedRoute } from '@angular/router';

@Component( {
  selector: 'institutions-info',
  templateUrl: './institutions-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class InstitutionsInfoComponent extends InstitutionsAddressComponent {


  protected listName: string = 'institutionList';

  public config = InstitutionsConfig;

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: InstitutionsRequestsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    private overlayService: OverlayService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer, route );

  }


  public import(): void {

    this.overlayService.activePopup$.next( 'InstitutionsImportComponent' );

  }

}
