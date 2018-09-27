import { Component, OnInit } from '@angular/core';
import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';
import { Subscription } from 'rxjs/Subscription';
import { WorkflowDeleteConfig } from '../../../../../config/workflow.config';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';

@Component({
  selector: 'workflow-delete',
  templateUrl: './workflow-delete.component.html',
  styleUrls: ['./workflow-delete.component.scss']
})
export class WorkflowDeleteComponent extends PopupInnerComponent implements OnInit {


  private currentItemSubscription: Subscription;

  protected config = WorkflowDeleteConfig;

  private currentItem: Object;

  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private workflowService: WorkflowService ) {

    super( dataBindingService, overlayService );

  }


  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.workflowService.currentWorkflow.subscribe( ( currentItem: any ) => {

      this.currentItem = currentItem;

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


  public ok(): void {

    this.dataBindingService.confirm.next( true );

    this.overlayService.closePopup();

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.subscribeCurrentItem();

  }

}
