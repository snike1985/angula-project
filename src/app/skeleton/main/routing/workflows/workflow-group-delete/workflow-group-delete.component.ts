import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';

import { WorkflowGroupDeleteConfig } from '../../../../../config/workflow.config';


@Component( {
  selector: 'workflow-group-delete',
  templateUrl: './workflow-group-delete.component.html',
  styleUrls: [ './workflow-group-delete.component.scss' ]
} )
export class WorkflowGroupDeleteComponent extends PopupInnerComponent implements OnInit {

  private paymentMethodsSubscription: Subscription;

  protected config = WorkflowGroupDeleteConfig;

  private paymentMethods: Object[] = [];


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private workflowService: WorkflowService ) {

    super( dataBindingService, overlayService );

  }


  private subscribePaymentMethods(): void {

    this.paymentMethodsSubscription = this.workflowService.currentPaymentMethods.subscribe( ( paymentMethods: any ) => {

      this.paymentMethods = paymentMethods;

    } );

  }

  private unSubscribePaymentMethods(): void {

    if ( this.paymentMethodsSubscription && !this.paymentMethodsSubscription.closed ) {

      this.paymentMethodsSubscription.unsubscribe();

    }

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.unSubscribePaymentMethods();

  }


  public ok(): void {

    this.dataBindingService.confirm.next( true );

    this.overlayService.closePopup();

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.subscribePaymentMethods();

  }

}
