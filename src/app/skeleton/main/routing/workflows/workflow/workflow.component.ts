import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { FormControl } from '@angular/forms';

import { WorkflowConfig } from '../../../../../config/workflow.config';

import { Subscription } from 'rxjs/Subscription';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';


@Component( {
  selector: 'workflow',
  templateUrl: './workflow.component.html',
  styleUrls: [ './workflow.component.scss' ]
} )
export class WorkflowComponent implements OnInit, OnDestroy {

  @Input() workflow: Object;
  @Input() language: string;
  @Input() public workflows;
  @Input() public index;
  @Input() paymentMethods: Object[];

  private fcSubscription: Subscription;
  private confirmSubscription: Subscription;
  private config: Object = WorkflowConfig;
  private justChanged: boolean = false;
  private createConfirmSubscription: Subscription;

  public fc: FormControl;
  public texts: Object;
  public loading: boolean = false;


  constructor( private workflowService: WorkflowService,
    private overlayService: OverlayService,
    private dataBindingService: DataBindingService,
    private notification: NotificationService ) { }



  private subscribeCreateConfirm(): void {

    this.createConfirmSubscription = this.workflowService.confirm.subscribe( ( confirm: any ) => {

      if ( confirm ) {

        this.workflow = confirm;

        this.justChanged = true;

        this.fc.setValue( confirm[ 'enabled' ] );

        setTimeout(() => {
          this.justChanged = false;
        }, 500)

      }

      this.unSubscribeCreateConfirm();

    } );

  }

  private unSubscribeCreateConfirm(): void {

    if ( this.createConfirmSubscription && !this.createConfirmSubscription.closed ) {

      this.createConfirmSubscription.unsubscribe();

    }

  }

  private createFc(): void {

    this.fc = new FormControl( this.workflow[ 'enabled' ] );

    this.subscribeFc();

  }

  private deleteItem(): void {
    this.loading = true;

    this.workflowService.send( 'deleteWorkflow', {}, this.workflow[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.workflows.splice( this.index, 1 );

          } else {

            this.notification.errorNotify( data[ 'message' ] );

          }

          this.loading = false;

        } );
  }

  private subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: any ) => {

      if ( confirm ) {

        this.deleteItem();

      }

      this.unSubscribeConfirm();

    } );

  }

  private unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }

  private subscribeFc(): void {

    this.fcSubscription = this.fc.valueChanges.subscribe( ( status: boolean ) => {

      console.log( status );

      if ( !this.justChanged ) {

        this.workflow[ 'enabled' ] = status;

        this.workflowService.send( 'updateWorkflow', this.workflow, this.workflow[ 'id' ] )
            .subscribe( res => {

              let data = res.json();

              if ( data[ 'status' ] === 'success' ) {

                this.notification.successNotify( data[ 'message' ] );

              } else {

                this.notification.errorNotify( data[ 'message' ] );

              }

            } );

      }

    } );

  }

  private unSubscribeFc(): void {

    if ( this.fcSubscription && !this.fcSubscription.closed ) {

      this.fcSubscription.unsubscribe();

    }

  }

  private unSubscribeAll(): void {

    this.unSubscribeFc();

    this.unSubscribeConfirm();

    this.unSubscribeCreateConfirm();

  }


  public askToDelete(): void {

    this.dataBindingService.confirm.next( false );

    this.subscribeConfirm();

    this.workflowService.currentWorkflow.next( this.workflow );

    this.overlayService.activePopup$.next( 'WorkflowDeleteComponent' );

  }

  public edit(): void {

    this.workflowService.confirm.next( null );

    this.subscribeCreateConfirm();

    this.workflowService.currentPaymentMethods.next( this.paymentMethods );

    this.subscribeConfirm();

    this.workflowService.currentWorkflow.next( this.workflow );

    this.overlayService.activePopup$.next( 'WorkflowNewComponent' );

  }

  public ngOnDestroy(): void {

    this.unSubscribeAll();

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.createFc();

  }

}
