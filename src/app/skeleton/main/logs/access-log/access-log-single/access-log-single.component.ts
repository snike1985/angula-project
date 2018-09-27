import {
  Component,
  OnInit
} from '@angular/core';
import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';
import { Subscription } from 'rxjs/Subscription';
import { AccessLogsSingleConfig } from '../../../../../config/access-log.config';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { LogsAccessRequestsService } from '../../../../../services/main/logs/logs-access.service';

@Component( {
  selector: 'access-log-single',
  templateUrl: './access-log-single.component.html',
  styleUrls: [ './access-log-single.component.scss' ]
} )
export class AccessLogSingleComponent extends PopupInnerComponent implements OnInit {

  private currentItemSubscription: Subscription;

  protected config = AccessLogsSingleConfig;

  public currentItem: Object;
  public status: string = '';


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private auditLogService: LogsAccessRequestsService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.auditLogService.currentItem.subscribe( ( currentItem: Object ) => {

      console.log( currentItem );
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


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.subscribeCurrentItem();

  }

}
