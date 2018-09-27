import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';
import { XmlConfig } from '../../../../../config/xml.config';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';

@Component( {
  selector: 'transaction-log-xml',
  templateUrl: './transaction-log-xml.component.html',
  styleUrls: [ './transaction-log-xml.component.scss' ]
} )
export class TransactionLogXmlComponent extends PopupInnerComponent implements OnInit {

  private xmlSubjectSubscription: Subscription;

  protected config = XmlConfig;

  public xml: Object;
  public loading: boolean = true;

  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private transactionLogsService: TransactionLogsService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeXml(): void {

    this.xmlSubjectSubscription = this.transactionLogsService.rowDataSubject.subscribe( ( xmlSubject: any ) => {

      if ( xmlSubject ) {

        if ( xmlSubject[ 'failed' ] ) {

          this.overlayService.closePopup();

        } else {

          this.xml = xmlSubject;

          this.loading = false;

          console.log( this.xml );

        }


      }

    } );

  }

  private unSubscribeXml(): void {

    if ( this.xmlSubjectSubscription && !this.xmlSubjectSubscription.closed ) {

      this.xmlSubjectSubscription.unsubscribe();

    }

    this.transactionLogsService.rowDataSubject.next( null );


  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.unSubscribeXml();

  }


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.maxHeight = window.innerHeight - 60 - this.headerH;

    this.subscribeXml();

  }

}
