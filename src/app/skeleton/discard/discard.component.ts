import { Component } from '@angular/core';
import { OverlayService } from '../../services/overlay.service';
import { DataBindingService } from '../../services/data.binding.service';
import { DiscardConfig } from '../../config/discard.config';
import { YesNoComponent } from '../yes-no/yes-no.component';

@Component( {
  selector: 'discard',
  templateUrl: './discard.component.html',
  styleUrls: [ './discard.component.scss' ]
} )
export class DiscardComponent extends YesNoComponent {

  protected config = DiscardConfig;

  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService ) {

    super( dataBindingService, overlayService );

  }

}
