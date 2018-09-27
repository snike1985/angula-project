import {
  Component,
  OnInit
} from '@angular/core';

import { RowComponent } from '../../../../row/row.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { TransactionLogsRowConfig } from '../../../../../config/transaction-log.config';
import { NotificationService } from '../../../../../services/notification.service';


@Component( {
  selector: 'transaction-log-row',
  templateUrl: './transaction-log-row.component.html',
  styleUrls: [ './transaction-log-row.component.scss' ]
} )
export class TransactionLogRowComponent extends RowComponent implements OnInit {

  private config: object = TransactionLogsRowConfig;

  public action: string = '';
  public texts: Object;

  constructor( protected dataBindingService: DataBindingService,
    private rowStatusService: TransactionLogsService,
    private notificationService: NotificationService,
    private overlayService: OverlayService ) {

    super( dataBindingService );

  }


  public open(): void {

    this.rowStatusService.currentItem.next( this.data );

    this.overlayService.activePopup$.next( 'TransactionLogSingleComponent' );

  };

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

  }

  public mark( e ): void {

    e.stopPropagation();

    this.data[ 'for_review' ] = !this.data[ 'for_review' ];

    this.rowStatusService.send( 'setReview', this.data, this.data[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notificationService.successNotify( data[ 'message' ] );

          } else {

            this.data[ 'for_review' ] = !this.data[ 'for_review' ];

            this.notificationService.errorNotify( data[ 'message' ] );

          }

        } );

  }

  public viewJson( e ): void {

    e.stopPropagation();

    this.rowStatusService.getJsonById( this.data[ 'id' ] );

    this.overlayService.activePopup$.next( 'TransactionLogJsonComponent' );


  }


}
