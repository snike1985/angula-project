import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { YesNoComponent } from '../yes-no/yes-no.component';

import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';
import { MerchantsRequestsService } from '../../services/main/institutions/merchants-requests.service';

import { MerchantDeleteConfig } from '../../config/delete-confirmation.config';


@Component({
  selector: 'merchant-delete',
  templateUrl: './merchant-delete.component.html',
  styleUrls: ['./merchant-delete.component.scss']
})
export class MerchantDeleteComponent extends YesNoComponent {

  private currentItemSubscription: Subscription;

  protected config = MerchantDeleteConfig;

  public currentItem: Object;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private merchantsService: MerchantsRequestsService ) {

    super( dataBindingService, overlayService );

    this.subscribeCurrentItem();

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.merchantsService.currentItem.subscribe( currentItem => {

      this.currentItem = currentItem;

    } );

  }

  private unSubscribeCurrentItem(): void {

    if ( this.currentItemSubscription && !this.currentItemSubscription.closed ) {

      this.currentItemSubscription.unsubscribe();

    }

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
    this.unSubscribeCurrentItem();

  }

}
