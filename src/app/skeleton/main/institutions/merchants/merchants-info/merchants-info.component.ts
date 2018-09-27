import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { MerchantsRequestsService } from '../../../../../services/main/institutions/merchants-requests.service';
import { NotificationService } from '../../../../../services/notification.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { MerchantsConfig } from '../../../../../config/merchants.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { InstitutionsAddressComponent } from '../../institutions-address/institutions-address.component';
import { Subscription } from 'rxjs/Subscription';
import { InstitutionsRequestsService } from '../../../../../services/main/institutions/institutions-requests.service';
import { ActivatedRoute } from '@angular/router';


@Component( {
  selector: 'institutions-info',
  templateUrl: './merchants-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class MerchantsInfoComponent extends InstitutionsAddressComponent {

  private institutionsSubscription: Subscription;

  protected listName: string = 'merchantList';

  public config = MerchantsConfig;
  public institutionsOptions: any[];


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: MerchantsRequestsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    protected route: ActivatedRoute,
    private overlayService: OverlayService,
    private institutionsService: InstitutionsRequestsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer, route );

    this.subscribeQueryParams();

  }


  private subscribeInstitutions(): void {

    this.institutionsSubscription = this.institutionsService.itemsList.subscribe( ( institutions: any ) => {

      if ( institutions.length ) {

        this.institutionsOptions = institutions;

        this.updateFilter( 'institutions', this.institutionsOptions );


      } else {

        this.institutionsService.getSelectOptions();

      }
    } );

  }

  private unSubscribeInstitutions(): void {

    if ( this.institutionsSubscription && !this.institutionsSubscription.closed ) {

      this.institutionsSubscription.unsubscribe();

    }

  }



  protected getFilterData(): void {

    this.setFilterLanguage();

    this.subscribeAddress();

    this.subscribeInstitutions();


  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.unSubscribeAddress();

    this.view.unsubscribe();

    this.unSubscribeInstitutions();

  }


  public import(): void {

    this.overlayService.activePopup$.next( 'InstitutionsImportComponent' );

  }

}
