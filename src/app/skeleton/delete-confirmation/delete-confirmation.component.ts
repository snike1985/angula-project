import { Component } from '@angular/core';
import { YesNoComponent } from '../yes-no/yes-no.component';
import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';
import { DeleteConfirmationConfig } from '../../config/delete-confirmation.config';
import { InstitutionsRequestsService } from '../../services/main/institutions/institutions-requests.service';
import { Subscription } from 'rxjs/Subscription';
import { Institution } from '../../interfaces/institution';

@Component( {
  selector: 'delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: [ './delete-confirmation.component.scss' ]
} )
export class DeleteConfirmationComponent extends YesNoComponent {

  private currentItemSubscription: Subscription;

  protected config = DeleteConfirmationConfig;

  public currentItem: Institution;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private institutionsService: InstitutionsRequestsService ) {

    super( dataBindingService, overlayService );

    this.subscribeCurrentItem();

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.institutionsService.currentItem.subscribe( ( currentItem: Institution ) => {

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
