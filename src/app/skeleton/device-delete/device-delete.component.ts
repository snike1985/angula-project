import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';
import { LocationsRequestsService } from '../../services/main/institutions/locations-requests.service';

import { YesNoComponent } from '../yes-no/yes-no.component';

import { DeviceDeleteConfig } from '../../config/delete-confirmation.config';
import { DevicesRequestsService } from '../../services/main/institutions/devices-requests.service';
import { log } from 'util';


@Component({
  selector: 'device-delete',
  templateUrl: './device-delete.component.html',
  styleUrls: ['./device-delete.component.scss']
})
export class DeviceDeleteComponent extends YesNoComponent {

  private currentItemSubscription: Subscription;

  protected config = DeviceDeleteConfig;

  public currentItem: Object;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private deviceService: DevicesRequestsService ) {

    super( dataBindingService, overlayService );

    this.subscribeCurrentItem();

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.deviceService.currentItem.subscribe( currentItem => {

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
