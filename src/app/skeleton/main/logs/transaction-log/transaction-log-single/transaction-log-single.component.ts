import {
  Component,
  OnInit
} from '@angular/core';
import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { Subscription } from 'rxjs/Subscription';
import { NotificationService } from '../../../../../services/notification.service';
import { TransactionLogsSingleConfig } from '../../../../../config/transaction-log.config';

@Component( {
  selector: 'transaction-log-single',
  templateUrl: './transaction-log-single.component.html',
  styleUrls: [ './transaction-log-single.component.scss' ]
} )
export class TransactionLogSingleComponent extends PopupInnerComponent implements OnInit {

  private currentItemSubscription: Subscription;
  private currentItem: any;

  protected config = TransactionLogsSingleConfig;


  constructor(
    protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private transactionLogsService: TransactionLogsService,
    private notificationService: NotificationService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.transactionLogsService.currentItem.subscribe( ( currentItem: any ) => {

      if ( currentItem ) {

        this.currentItem = currentItem;
        console.log( this.currentItem );

      }

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


  public mark( e ): void {

    e.stopPropagation();

    this.currentItem[ 'for_review' ] = !this.currentItem[ 'for_review' ];

    this.transactionLogsService.send( 'setReview', this.currentItem, this.currentItem[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notificationService.successNotify( data[ 'message' ] );

          } else {

            this.currentItem[ 'for_review' ] = !this.currentItem[ 'for_review' ];

            this.notificationService.errorNotify( data[ 'message' ] );

          }

        } );

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.maxHeight = window.innerHeight - 60 - this.headerH;

    this.subscribeCurrentItem();

  }

  public viewJson(): void {

    this.transactionLogsService.getJsonById( this.currentItem[ 'id' ] );

    this.overlayService.activePopup$.next( 'TransactionLogJsonComponent' );


  }

  public viewRowData(): void {

    this.transactionLogsService.getXmlById( this.currentItem[ 'id' ] );

    this.overlayService.activePopup$.next( 'TransactionLogXmlComponent' );


  }

}
