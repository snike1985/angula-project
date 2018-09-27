import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { FormControl } from '@angular/forms';

import { OverlayService } from '../../../../../services/overlay.service';

import { WorkflowGroupConfig } from '../../../../../config/workflow.config';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';
import { NotificationService } from '../../../../../services/notification.service';
import { DataBindingService } from '../../../../../services/data.binding.service';


@Component( {
  selector: 'workflow-group',
  templateUrl: './workflow-group.component.html',
  styleUrls: [ './workflow-group.component.scss' ]
} )
export class WorkflowGroupComponent implements OnInit, OnDestroy {

  @Input() public workflowGroup;
  @Input() public workflowGroups;
  @Input() public index;
  @Input() public language;

  private fcSubscription: Subscription;
  private config: Object = WorkflowGroupConfig;
  private confirmSubscription: Subscription;
  private createConfirmSubscription: Subscription;

  public fc: FormControl;
  public texts: Object;
  public loading: boolean = false;


  constructor( private dataBindingService: DataBindingService,
    private workflowService: WorkflowService,
    private notificationService: NotificationService,
    private overlayService: OverlayService,
    private notification: NotificationService ) {}


  private subscribeCreateConfirm(): void {

    this.createConfirmSubscription = this.workflowService.confirm.subscribe( ( confirm: any ) => {

      if ( confirm ) {

        if ( !this.workflowGroup[ 'workflows' ] ) {

          this.workflowGroup[ 'workflows' ] = [];

        }

        this.workflowGroup[ 'workflows' ].push( confirm );

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

    this.fc = new FormControl( this.workflowGroup[ 'status' ] );

    this.subscribeFc();

  }

  private deleteItem(): void {
    this.loading = true;

    this.workflowService.send( 'delete', {}, this.workflowGroup[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'success' ) {

            this.notification.successNotify( data[ 'message' ] );

            this.workflowGroups.splice( this.index, 1 );

          } else {

            this.notification.errorNotify( data[ 'message' ] );

          }

          this.loading = false;

        } );
  }

  private subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: boolean ) => {

      if ( confirm ) {

        this.deleteItem();

      }

      this.unSubscribeConfirm();

    } );

  }

  private subscribeFc(): void {

    this.fcSubscription = this.fc.valueChanges.subscribe( ( status: boolean ) => {

      this.workflowGroup[ 'status' ] = status;

      this.workflowService.send( 'update', this.workflowGroup, this.workflowGroup[ 'id' ] )
          .subscribe( res => {

            let data = res.json();

            if ( data[ 'status' ] === 'success' ) {

              this.notificationService.successNotify( data[ 'message' ] );

            } else {

              this.notificationService.successNotify( data[ 'message' ] );

            }

          } );

    } );

  }

  private unSubscribeAll(): void {

    this.unSubscribeFc();

    this.unSubscribeConfirm();

    this.unSubscribeCreateConfirm();

  }

  private unSubscribeFc(): void {

    if ( this.fcSubscription && !this.fcSubscription.closed ) {

      this.fcSubscription.unsubscribe();

    }

  }


  protected unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }


  public addWorkflow(): void {

    this.workflowService.confirm.next( null );

    this.subscribeCreateConfirm();

    this.workflowService.currentPaymentMethods.next( this.workflowGroup[ 'paymentMethods' ] );

    this.subscribeConfirm();

    this.workflowService.currentWorkflow.next( null );

    this.overlayService.activePopup$.next( 'WorkflowNewComponent' );

  }

  public askToDelete(): void {

    this.dataBindingService.confirm.next( false );

    this.subscribeConfirm();

    this.workflowService.currentPaymentMethods.next( this.workflowGroup[ 'paymentMethods' ] );

    this.workflowService.currentWorkflowGroup.next( this.workflowGroup );

    this.overlayService.activePopup$.next( 'WorkflowGroupDeleteComponent' );

  }

  public editWorkflowGroup(): void {

    this.workflowService.currentWorkflowGroup.next( this.workflowGroup );

    this.overlayService.activePopup$.next( 'WorkflowGroupNewComponent' );

  }

  public ngOnDestroy(): void {

    this.unSubscribeAll();

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.createFc();

  }

}
