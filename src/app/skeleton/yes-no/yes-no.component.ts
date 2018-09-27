import { PopupInnerComponent } from '../popup-inner/popup-inner.component';
import { DataBindingService } from '../../services/data.binding.service';
import { OverlayService } from '../../services/overlay.service';

export class YesNoComponent extends PopupInnerComponent {


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService ) {

    super( dataBindingService, overlayService );

  }

  public ok(): void {

    this.dataBindingService.confirm.next( true );

    this.overlayService.closePopup();

  }

  public cancel(): void {

    this.dataBindingService.confirm.next( false );

    this.overlayService.closePopup();

  }

}
