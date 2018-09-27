import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';
import { OverlayService } from '../../../../../services/overlay.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { JsonConfig } from '../../../../../config/json.config';

@Component( {
  selector: 'transaction-log-json',
  templateUrl: './transaction-log-json.component.html',
  styleUrls: [ './transaction-log-json.component.scss' ]
} )
export class TransactionLogJsonComponent extends PopupInnerComponent implements OnInit {

  private jsonSubjectSubscription: Subscription;

  protected config = JsonConfig;

  public json: Object;
  public loading: boolean = true;

  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private transactionLogsService: TransactionLogsService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeJson(): void {

    this.jsonSubjectSubscription = this.transactionLogsService.jsonSubject.subscribe( ( jsonSubject: any ) => {

      if ( jsonSubject ) {

        if ( jsonSubject[ 'failed' ] ) {

          this.overlayService.closePopup();

        } else {

          this.json = jsonSubject;

          this.loading = false;

        }


      }


    } );

  }

  private unSubscribeJson(): void {

    if ( this.jsonSubjectSubscription && !this.jsonSubjectSubscription.closed ) {

      this.jsonSubjectSubscription.unsubscribe();

    }

    this.transactionLogsService.jsonSubject.next( null );

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.unSubscribeJson();

  }


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.maxHeight = window.innerHeight - 60 - this.headerH;

    this.subscribeJson();

  }

}
