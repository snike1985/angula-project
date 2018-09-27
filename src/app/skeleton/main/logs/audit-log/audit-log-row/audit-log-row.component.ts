import {
  Component,
  OnInit
} from '@angular/core';

import { RowComponent } from '../../../../row/row.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LogsAuditRequestsService } from '../../../../../services/main/logs/logs-audit.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { AuditLogsRowConfig } from '../../../../../config/audit-log.config';


@Component( {
  selector: 'audit-log-row',
  templateUrl: './audit-log-row.component.html',
  styleUrls: [ './audit-log-row.component.scss' ]
} )
export class AuditLogRowComponent extends RowComponent implements OnInit {

  private config: object = AuditLogsRowConfig;

  public action: string = '';


  constructor( protected dataBindingService: DataBindingService,
    private rowStatusService: LogsAuditRequestsService,
    private overlayService: OverlayService ) {

    super( dataBindingService );

  }


  private getStatus(): void {

    this.action = this.config[ 'texts' ][ this.language ][ 'action' ][ this.data[ 'action' ] ] || 'null';

  }


  public open(): void {

    this.rowStatusService.currentItem.next( this.data );

    this.overlayService.activePopup$.next( 'AuditLogSingleComponent' );

  };


  public ngOnInit(): void {

    this.getStatus();

  }


}
