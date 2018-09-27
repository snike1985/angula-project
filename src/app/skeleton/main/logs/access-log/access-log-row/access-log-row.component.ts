import { Component, OnInit } from '@angular/core';
import { RowComponent } from '../../../../row/row.component';
import { AccessLogsRowConfig } from '../../../../../config/access-log.config';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAccessRequestsService } from '../../../../../services/main/logs/logs-access.service';
import { OverlayService } from '../../../../../services/overlay.service';

@Component({
  selector: 'access-log-row',
  templateUrl: './access-log-row.component.html',
  styleUrls: ['./access-log-row.component.scss']
})
export class AccessLogRowComponent extends RowComponent implements OnInit {

  private config: object = AccessLogsRowConfig;

  public action: string = '';
  public texts: Object;


  constructor( protected dataBindingService: DataBindingService,
    private rowStatusService: LogsAccessRequestsService,
    private overlayService: OverlayService ) {

    super( dataBindingService );

  }


  public open(): void {

    this.rowStatusService.currentItem.next( this.data );

    this.overlayService.activePopup$.next( 'AccessLogSingleComponent' );

  };

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

  }


}
