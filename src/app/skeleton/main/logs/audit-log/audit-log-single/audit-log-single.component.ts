import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { LogsAuditRequestsService } from '../../../../../services/main/logs/logs-audit.service';

import { AuditLogsSingleConfig } from '../../../../../config/audit-log.config';


@Component( {
  selector: 'audit-log-single',
  templateUrl: './audit-log-single.component.html',
  styleUrls: [ './audit-log-single.component.scss' ]
} )
export class AuditLogSingleComponent extends PopupInnerComponent implements OnInit {

  private currentItemSubscription: Subscription;

  protected config = AuditLogsSingleConfig;

  public currentItem: Object;
  public status: string = '';


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private auditLogService: LogsAuditRequestsService ) {

    super( dataBindingService, overlayService );

  }


  private getStatus(): void {

    this.status = this.texts[ 'action' ][ this.currentItem[ 'action' ] ] || 'null';

  }

  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.auditLogService.currentItem.subscribe( ( currentItem: Object ) => {

      this.currentItem = currentItem;

      this.getStatus();

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
