import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';
import { LocationsRequestsService } from '../../services/main/institutions/locations-requests.service';

import { YesNoComponent } from '../yes-no/yes-no.component';

import { LocationDeleteConfig } from '../../config/delete-confirmation.config';


@Component({
  selector: 'location-delete',
  templateUrl: './location-delete.component.html',
  styleUrls: ['./location-delete.component.scss']
})
export class LocationDeleteComponent extends YesNoComponent {

  private currentItemSubscription: Subscription;

  protected config = LocationDeleteConfig;

  public currentItem: Object;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private merchantsService: LocationsRequestsService ) {

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
