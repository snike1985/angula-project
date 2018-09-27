import {
  Component,
  OnInit
} from '@angular/core';

import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { WorkflowGroupNewConfig } from '../../../../../config/workflow.config';
import { Subscription } from 'rxjs/Subscription';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';
import { PaymentMethodsService } from '../../../../../services/payment-methods.service';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { NotificationService } from '../../../../../services/notification.service';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';


@Component( {
  selector: 'workflow-group-new',
  templateUrl: './workflow-group-new.component.html',
  styleUrls: [ './workflow-group-new.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class WorkflowGroupNewComponent extends PopupInnerComponent implements OnInit {

  private paymentMethodSubscription: Subscription;
  private currentItemSubscription: Subscription;
  private fgSubscription: Subscription;

  protected config = WorkflowGroupNewConfig;

  public paymentMethods: Object[];
  public currentItem: Object;
  public fg: FormGroup;
  public texts: Object;
  public invalid: boolean = false;
  public loading: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private workflowService: WorkflowService,
    private notificationService: NotificationService,
    private paymentMethodsService: PaymentMethodsService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeFg(): void {

    this.fgSubscription = this.fg.valueChanges.subscribe( ( value: any ) => {

      for ( let key in value ) {

        if ( value[ key ] ) {

          this.invalid = false;

        }

      }

    } );

  }

  private unSubscribeFg(): void {

    if ( this.fgSubscription && !this.fgSubscription.closed ) {

      this.fgSubscription.unsubscribe();

    }

  }

  private createFg(): void {

    let controls = {};

    for ( let method of this.paymentMethods ) {

      let status = this.currentItem[ 'paymentMethods' ].filter( data => {

        return data[ 'id' ] === method[ 'id' ];

      } )[ 0 ] !== undefined;


      controls[ method[ 'id' ] ] = new FormControl( status );

    }

    this.fg = new FormGroup( controls );

    this.subscribeFg();

  }

  private setData( value ): void {

    this.currentItem[ 'paymentMethods' ] = [];

    for ( let controlKey in value ) {

      let control = value[ controlKey ];

      if ( control ) {

        this.currentItem[ 'paymentMethods' ].push( this.paymentMethods.filter( data => {
          return data[ 'id' ] === +controlKey;
        } )[ 0 ] );

      }

    }

  }

  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.workflowService.currentWorkflowGroup.subscribe( ( currentItem: any ) => {

      if ( currentItem ) {

        this.currentItem = currentItem;

      } else {

        this.currentItem = {
          id: '',
          paymentMethods: [],
          status: true
        };

      }

      this.createFg();

    } );

  }

  private subscribePaymentMethod(): void {

    this.paymentMethodSubscription = this.paymentMethodsService.paymentMethodOptions.subscribe( ( paymentMethods: any ) => {

      if ( paymentMethods.length ) {

        this.paymentMethods = paymentMethods;

        this.subscribeCurrentItem();

      } else {

        this.paymentMethodsService.getMethods();

      }

    } );

  }

  private unSubscribeCurrentItem(): void {

    if ( this.currentItemSubscription && !this.currentItemSubscription.closed ) {

      this.currentItemSubscription.unsubscribe();
      this.unSubscribeCurrentItem();

    }

  }

  private unSubscribePaymentMethod(): void {

    if ( this.paymentMethodSubscription && !this.paymentMethodSubscription.closed ) {

      this.paymentMethodSubscription.unsubscribe();

    }

    this.paymentMethodsService.paymentMethodOptions.next( [] );

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
    this.unSubscribeCurrentItem();
    this.unSubscribePaymentMethod();
    this.unSubscribeFg();

  }


  public cancel(): void {

    for ( let method of this.paymentMethods ) {

      let status = this.currentItem[ 'paymentMethods' ].filter( data => {

        return data[ 'id' ] === method[ 'id' ];

      } )[ 0 ] !== undefined;


      this.fg[ 'controls' ][ method[ 'id' ] ].setValue( status );

    }

  }

  public create( e, { value } ): void {

    e.preventDefault();

    this.setData( value );

    if ( this.currentItem[ 'paymentMethods' ].length ) {

      this.loading = true;

      this.workflowService.send( 'insert', this.currentItem )
          .subscribe( res => {

            let data = res.json();

            this.loading = false;

            if ( data[ 'status' ] === 'success' ) {

              this.dataBindingService.confirm.next( true );
              this.overlayService.closePopup();
              this.notificationService.successNotify( data[ 'message' ] );

            } else {

              this.notificationService.successNotify( data[ 'message' ] );

            }


          } );

    } else {

      this.invalid = true;

    }

  }

  public removeItem(): void {

  }

  public edit( e, { value } ): void {

    e.preventDefault();

    this.setData( value );

    if ( this.currentItem[ 'paymentMethods' ].length ) {

      this.loading = true;

      this.workflowService.send( 'update', this.currentItem, this.currentItem[ 'id' ] )
          .subscribe( res => {

            let data = res.json();

            this.loading = false;

            if ( data[ 'status' ] === 'success' ) {

              this.overlayService.closePopup();
              this.notificationService.successNotify( data[ 'message' ] );

            } else {

              this.notificationService.successNotify( data[ 'message' ] );

            }


          } );

    } else {

      this.invalid = true;

    }

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];
    this.maxHeight = window.innerHeight - 60 - this.headerH;

    this.subscribePaymentMethod();

  }

}
