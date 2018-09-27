import {
  Component,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';

import { WorkflowServiceConfig } from '../../../../../config/workflow.config';


@Component( {
  selector: 'workflow-service',
  templateUrl: './workflow-service.component.html',
  styleUrls: [ './workflow-service.component.scss' ]
} )
export class WorkflowServiceComponent implements OnInit, OnDestroy {

  @Input() public language: string;
  @Input() public service: Object;
  @Input() public parent: any = null;
  @Input() public level: number = 0;
  @Input() public index: string;

  private serviceSubscription: Subscription;
  private config: Object = WorkflowServiceConfig;
  private servicesSubscription: Subscription;
  private parentSubscription: Subscription;
  private optionalSubscription: Subscription;
  private changesMadeSubscription: Subscription;

  public services: Object[];
  public texts: Object;
  public fg: FormGroup;
  public dependsServices: Object[];


  constructor( private workflowService: WorkflowService ) { }


  private subscribeChangesMade(): void {

    this.changesMadeSubscription = this.workflowService.changesMade.subscribe( ( changesMade: any ) => {

      if ( changesMade ) {

        this.getDependsServices();

      }

    } );

  }

  private unSubscribeChangesMade(): void {

    if ( this.changesMadeSubscription && !this.changesMadeSubscription.closed ) {

      this.changesMadeSubscription.unsubscribe();

    }

  }

  private createFg(): void {

    let parent = ( this.parent ) ? this.parent : '-1';

    this.fg = new FormGroup( {
      service: new FormControl( this.service[ 'id' ] ),
      optional: new FormControl( this.service[ 'optional' ] ),
      parent: new FormControl( parent )
    } );

    this.subscribeService();
    this.subscribeParent();
    this.subscribeOptional();

  }

  private getDependsServices(): void {

    let selected = this.getSelectedServices( [ this.service ] );

    this.dependsServices = [
      {
        value: '-1',
        text: this.texts[ 'none' ]
      }
    ];

    this.dependsServices = this.dependsServices.concat( this.services.filter( item => {
      return selected.indexOf( item[ 'value' ] ) < 0;
    } ) );

  }

  private getSelectedServices( services: Object[] ): Object[] {

    let selected = [];

    for ( let service of services ) {

      selected.push( service[ 'id' ] );

      if ( service[ 'services' ] ) {

        selected = selected.concat( this.getSelectedServices( service[ 'services' ] ) );

      }

    }

    return selected;

  }

  private subscribeOptional(): void {

    this.optionalSubscription = this.fg.controls[ 'optional' ].valueChanges.subscribe( ( value: any ) => {

      this.workflowService.serviceChanges.next( {
        item: this.index,
        optional: value
      } );

    } );

  }

  private subscribeParent(): void {

    this.parentSubscription = this.fg.controls[ 'parent' ].valueChanges.subscribe( ( value: any ) => {

      this.workflowService.serviceChanges.next( {
        item: this.index,
        parent: +value,
        prev: this.service[ 'id' ]
      } );

    } );

  }

  private subscribeService(): void {

    this.serviceSubscription = this.fg.controls[ 'service' ].valueChanges.subscribe( ( value: any ) => {

      this.workflowService.serviceChanges.next( {
        item: this.index,
        service: value,
        prev: this.service[ 'id' ]
      } );

    } );

  }

  private subscribeServices(): void {

    this.servicesSubscription = this.workflowService.services.subscribe( ( services: any ) => {

      if ( services.length ) {

        this.services = services;

        this.getDependsServices();

        this.createFg();

      }


    } );

  }

  private unSubscribeAll(): void {

    this.unSubscribeServices();
    this.unSubscribeService();
    this.unSubscribeParent();
    this.unSubscribeOptional();
    this.unSubscribeChangesMade();

  }

  private unSubscribeOptional(): void {

    if ( this.optionalSubscription && !this.optionalSubscription.closed ) {

      this.optionalSubscription.unsubscribe();

    }

  }

  private unSubscribeParent(): void {

    if ( this.parentSubscription && !this.parentSubscription.closed ) {

      this.parentSubscription.unsubscribe();

    }

  }

  private unSubscribeService(): void {

    if ( this.serviceSubscription && !this.serviceSubscription.closed ) {

      this.serviceSubscription.unsubscribe();

    }

  }

  private unSubscribeServices(): void {

    if ( this.servicesSubscription && !this.servicesSubscription.closed ) {

      this.servicesSubscription.unsubscribe();

    }

  }


  public ngOnDestroy(): void {

    this.unSubscribeAll();

  }

  public ngOnInit() {


    this.texts = this.config[ 'texts' ][ this.language ];

    if ( this.parent ) {

      this.level++;

      this.subscribeServices();
      this.subscribeChangesMade();

    }


  }

}
