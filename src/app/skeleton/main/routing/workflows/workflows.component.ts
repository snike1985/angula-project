import {
  Component,
  ElementRef,
  OnInit,
  Renderer2
} from '@angular/core';

import { ContentCommonComponent } from '../../../content-common/content-common.component';

import { DataBindingService } from '../../../../services/data.binding.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../config/animations.config';
import { Subscription } from 'rxjs/Subscription';

import { WorkflowService } from '../../../../services/main/workflow/workflow.service';

import { WorkflowsConfig } from '../../../../config/workflow.config';
import { OverlayService } from '../../../../services/overlay.service';


@Component( {
  selector: 'workflows',
  templateUrl: './workflows.component.html',
  styleUrls: [ './workflows.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class WorkflowsComponent extends ContentCommonComponent implements OnInit {

  private workflowGroupsSubscription: Subscription;
  private confirmSubscription: Subscription;

  public config = WorkflowsConfig;
  public texts: Object;
  public workflowGroups: Object[];

  constructor( protected dataBindingService: DataBindingService,
    protected  elemHref: ElementRef,
    protected renderer: Renderer2,
    private workflowService: WorkflowService,
    private overlayService: OverlayService ) {

    super( dataBindingService, elemHref, renderer );

  }


  private subscribeConfirm(): void {

    this.confirmSubscription = this.dataBindingService.confirm.subscribe( ( confirm: any ) => {

      if ( confirm ) {

        this.workflowService.itemsList.next( [] );

      }

      this.unSubscribeConfirm();

    } );

  }

  private subscribeWorkflowGroups(): void {

    this.workflowGroupsSubscription = this.workflowService.itemsList.subscribe( ( workflowGroups: any ) => {

      if ( workflowGroups.length ) {

        this.workflowGroups = workflowGroups;

        this.hideSpinner();

      } else {

        this.workflowService.getAllItems();

      }

    } );

  }

  private unSubscribeConfirm(): void {

    if ( this.confirmSubscription && !this.confirmSubscription.closed ) {

      this.confirmSubscription.unsubscribe();

    }

  }

  private unSubscribeWorkflowGroups(): void {

    if ( this.workflowGroupsSubscription && !this.workflowGroupsSubscription.closed ) {

      this.workflowGroupsSubscription.unsubscribe();

    }

  }


  protected clearAllItems(): void {

    this.workflowService.itemsList.next( [] );
    this.workflowService.services.next( [] );
    this.workflowService.currentWorkflow.next( null );
    this.workflowService.currentWorkflowGroup.next( null );
    this.workflowService.confirm.next( null );
    this.workflowService.serviceChanges.next( null );
    this.workflowService.currentPaymentMethods.next( [] );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    if ( this.scrollSubscription ) {

      this.scrollSubscription.unsubscribe();

    }

    this.view.unsubscribe();

    this.unSubscribeWorkflowGroups();

    this.unSubscribeConfirm();


  }


  public addWorkflowGroup(): void {

    this.workflowService.currentWorkflowGroup.next( null );

    this.dataBindingService.confirm.next( null );

    this.subscribeConfirm();

    this.overlayService.activePopup$.next( 'WorkflowGroupNewComponent' );

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.subscribeWorkflowGroups();

  }


}
