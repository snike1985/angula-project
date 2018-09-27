import {
  Component,
  OnInit
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { PopupInnerComponent } from '../../../../popup-inner/popup-inner.component';

import { OverlayService } from '../../../../../services/overlay.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { WorkflowService } from '../../../../../services/main/workflow/workflow.service';
import { NotificationService } from '../../../../../services/notification.service';

import { WorkflowNewConfig } from '../../../../../config/workflow.config';
import {
  FormControl,
  FormGroup
} from '@angular/forms';


@Component( {
  selector: 'workflow-new',
  templateUrl: './workflow-new.component.html',
  styleUrls: [ './workflow-new.component.scss' ]
} )
export class WorkflowNewComponent extends PopupInnerComponent implements OnInit {

  private servicesSubscription: Subscription;
  private services: Object[];
  private paymentMethodsSubscription: Subscription;
  private paymentMethods: Object[];
  private currentItemSubscription: Subscription;
  private serviceChangesSubscription: Subscription;

  protected headerH: number = 111;
  protected config = WorkflowNewConfig;


  public currentItem: Object;
  public loading: boolean = true;
  public fg: FormGroup;
  public selectedServices: Object[] = [];
  public lastServices: Object[];
  public error: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService,
    private workflowService: WorkflowService,
    private notificationService: NotificationService ) {

    super( dataBindingService, overlayService );

  }


  private addToParent( parentId, currentItem, services ): boolean {

    for ( let service of services ) {

      if ( service[ 'id' ] === parentId ) {

        if ( !service[ 'services' ] ) {
          service[ 'services' ] = [];
        }

        service[ 'services' ].push( currentItem );

        return true;

      }

      if ( service[ 'services' ] ) {

        if ( this.addToParent( parentId, currentItem, service[ 'services' ] ) ) {
          return true;
        }

      }

    }

    return false;
  }

  private changeSelectedServices( changes: Object ): void {

    if ( this.checkSelected( changes[ 'service' ], this.selectedServices ) ) {

      let currentService = this.deleteSelectedServiceById( changes[ 'prev' ], this.selectedServices )[ 0 ];

      currentService[ 'id' ] = changes[ 'service' ];
      currentService[ 'name' ] = this.services.filter( item => { return item[ 'value' ] === changes[ 'service' ]; } )[ 0 ][ 'text' ];

      if ( !this.setService( currentService, this.selectedServices ) ) {

        if ( currentService[ 'services' ] ) {

          this.deleteSelectedServiceById( currentService[ 'id' ], currentService[ 'services' ] );

        }

        this.selectedServices.push( currentService );


      }

    } else {

      let path = changes[ 'item' ].split( '-' ),
        currentService = this.getItemByPath( +path[ 0 ], path, 0, this.selectedServices );

      currentService[ 'id' ] = changes[ 'service' ];
      currentService[ 'name' ] = this.services.filter( item => { return item[ 'value' ] === changes[ 'service' ]; } )[ 0 ][ 'text' ];

    }

    this.setLastServices();

    this.workflowService.changesMade.next( true );


  }

  private changeServiceParent( changes: Object ): void {

    let currentService = this.deleteSelectedServiceById( changes[ 'prev' ], this.selectedServices )[ 0 ];

    if ( changes[ 'parent' ] === -1 ) {

      this.selectedServices.push( currentService );

    } else {

      if ( !this.addToParent( changes[ 'parent' ], currentService, this.selectedServices ) ) {

        let newService = this.services.filter( data => {
          return data[ 'value' ] === changes[ 'parent' ];
        } )[ 0 ];

        this.selectedServices.push( {
          id: newService[ 'value' ],
          name: newService[ 'name' ],
          optional: false,
          services: [ currentService ]
        } );

      }

    }

    this.workflowService.changesMade.next( true );

    this.setLastServices();

  }

  private changeServiceOptional( changes: Object ): void {

    let path = changes[ 'item' ].split( '-' ),
      currentService = this.getItemByPath( +path[ 0 ], path, 0, this.selectedServices );

    currentService[ 'optional' ] = changes[ 'optional' ];

  }

  private checkNames( services ): void {

    for ( let service of services ) {

      if ( service[ 'name' ] === undefined ) {

        service[ 'name' ] = this.services.filter( item => { return item[ 'value' ] === service[ 'id' ]; } )[ 0 ][ 'text' ];

      }

      if ( service[ 'services' ] ) {

        this.checkNames( service[ 'services' ] )

      }

    }

  }

  private checkSelected( id, services ): boolean {

    for ( let service of services ) {

      if ( service[ 'id' ] === id ) {

        return true;

      }

      if ( service[ 'services' ] ) {

        if ( this.checkSelected( id, service[ 'services' ] ) ) {

          return true;

        }

      }

    }

    return false;

  }

  private createFg(): void {

    this.fg = new FormGroup( {
      default: new FormControl( this.currentItem[ 'default' ] ),
      enabled: new FormControl( this.currentItem[ 'enabled' ] )
    } );

  }

  private deleteSelectedServiceById( id: number, services ): any {

    for ( let i = 0; i < services.length; i++ ) {

      let service = services[ i ];

      if ( service[ 'id' ] === id ) {

        return services.splice( i, 1 );

      } else if ( service[ 'services' ] && service[ 'services' ].length ) {

        let temp = this.deleteSelectedServiceById( id, service[ 'services' ] );

        if ( temp ) {

          return temp;

        }

      }

    }

    return false;

  }

  private getItemByPath( index: number, path: string[], deep: number, services: Object[] ): Object {

    let service = services[ index ];

    deep++;

    if ( deep === path.length ) {

      return service;

    } else {

      return this.getItemByPath( +path[ deep ], path, deep, service[ 'services' ] );

    }

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

  private setLastServices(): void {

    let selected = this.getSelectedServices( this.selectedServices );

    this.lastServices = this.services.filter( service => {

      return selected.indexOf( service[ 'value' ] ) < 0;

    } );


  }

  private setSelectedServices(): void {

    this.selectedServices = [];

    if ( this.currentItem[ 'services' ] ) {

      this.selectedServices = JSON.parse( JSON.stringify( this.currentItem[ 'services' ] ) );

    }

  }

  private setService( service, services: Object[] ): boolean {

    for ( let i = 0; i < services.length; i++ ) {

      let item = services[ i ];

      if ( item[ 'id' ] === service[ 'id' ] ) {

        if ( service[ 'services' ] ) {

          if ( item[ 'services' ] ) {

            item[ 'services' ] = item[ 'services' ].concat( service[ 'services' ] );

            return true;

          } else {

            item[ 'services' ] = service[ 'services' ];

          }

        }

        return true;

      } else {

        if ( item[ 'services' ] && item[ 'services' ].length ) {

          if ( this.setService( service, item[ 'services' ] ) ) {

            return true;

          }

        }

      }

    }

    return false;
  }

  private setData( value ): void {

    this.currentItem[ 'enabled' ] = value[ 'enabled' ];
    this.currentItem[ 'default' ] = value[ 'default' ];
    this.currentItem[ 'services' ] = this.selectedServices;

    this.checkNames( this.currentItem[ 'services' ] );

  }

  private subscribeCurrentItem(): void {

    this.currentItemSubscription = this.workflowService.currentWorkflow.subscribe( ( currentItem: any ) => {

      if ( currentItem ) {

        this.currentItem = currentItem;

      } else {

        this.currentItem = {
          default: true,
          enabled: true,
          name: '',
          id: null,
          services: []
        };

      }

      this.setSelectedServices();

      this.setLastServices();

      this.createFg();

      this.loading = false;

    } );

  }

  private subscribePaymentMethods(): void {

    this.paymentMethodsSubscription = this.workflowService.currentPaymentMethods.subscribe( ( paymentMethods: any ) => {

      this.paymentMethods = paymentMethods;

    } );

  }

  private subscribeServiceChanges(): void {

    this.serviceChangesSubscription = this.workflowService.serviceChanges.subscribe( ( serviceChanges: any ) => {

      if ( serviceChanges ) {

        if ( serviceChanges[ 'optional' ] !== undefined ) {

          this.changeServiceOptional( serviceChanges );

        } else if ( serviceChanges[ 'parent' ] ) {

          this.changeServiceParent( serviceChanges );

        } else if ( serviceChanges[ 'service' ] ) {

          this.changeSelectedServices( serviceChanges );

        }

        this.workflowService.serviceChanges.next( null );

      }

    } );

  }

  private subscribeServices(): void {

    this.servicesSubscription = this.workflowService.services.subscribe( ( services: any ) => {


      if ( services.length ) {

        this.services = services;

        this.subscribeCurrentItem();

      } else {

        this.workflowService.getAllServices();

      }

    } );

  }

  private unSubscribeCurrentItem(): void {

    if ( this.currentItemSubscription && !this.currentItemSubscription.closed ) {

      this.currentItemSubscription.unsubscribe();
      this.unSubscribeCurrentItem();

    }

  }

  private unSubscribePaymentMethods(): void {

    if ( this.paymentMethodsSubscription && !this.paymentMethodsSubscription.closed ) {

      this.paymentMethodsSubscription.unsubscribe();

    }

  }

  private unSubscribeServiceChanges(): void {

    if ( this.serviceChangesSubscription && !this.serviceChangesSubscription.closed ) {

      this.serviceChangesSubscription.unsubscribe();

    }

  }

  private unSubscribeServices(): void {

    if ( this.servicesSubscription && !this.servicesSubscription.closed ) {

      this.servicesSubscription.unsubscribe();

    }

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.unSubscribeServices();

    this.unSubscribePaymentMethods();

    this.unSubscribeCurrentItem();

    this.unSubscribeServiceChanges();

  }


  public addService( item ): void {

    let service = this.lastServices.filter( data => {

      return data[ 'value' ] === item;

    } )[ 0 ];

    this.selectedServices.push( {
      id: service[ 'value' ],
      name: service[ 'text' ],
      optional: false,
      services: []
    } );

    this.error = false;

    this.setLastServices();

  }

  public cancel(): void {

    this.setSelectedServices();

    this.setLastServices();

    this.fg[ 'controls' ][ 'default' ].setValue( this.currentItem[ 'default' ] );
    this.fg[ 'controls' ][ 'enabled' ].setValue( this.currentItem[ 'enabled' ] );

  }

  public create( e, { value } ) {

    e.stopPropagation();

    if ( !this.selectedServices.length ) {

      this.error = true;

    } else {

      this.setData( value );

      this.loading = true;

      this.workflowService.send( 'insertWorkflow', this.currentItem )
          .subscribe( res => {

            let data = res.json();

            if ( data[ 'status' ] === 'success' ) {

              this.notificationService.successNotify( data[ 'message' ] );

              this.overlayService.closePopup();

              this.workflowService.confirm.next( this.currentItem );

            } else {

              this.notificationService.errorNotify( data[ 'message' ] );

            }

            this.loading = false;

          } );

    }

  }

  public edit( e, { value } ) {

    e.stopPropagation();

    if ( !this.selectedServices.length ) {

      this.error = true;

    } else {

      this.setData( value );

      this.loading = true;

      this.workflowService.send( 'updateWorkflow', this.currentItem, this.currentItem[ 'id' ] )
          .subscribe( res => {


            let data = res.json();

            if ( data[ 'status' ] === 'success' ) {

              this.notificationService.successNotify( data[ 'message' ] );

              this.workflowService.confirm.next( this.currentItem );

              this.overlayService.closePopup();

            } else {

              this.notificationService.errorNotify( data[ 'message' ] );

            }

            this.loading = false;

          } );

    }

  }

  public ngOnInit(): void {

    this.subscribeServices();

    this.texts = this.config[ 'texts' ][ this.language ];
    this.maxHeight = window.innerHeight - 60 - this.headerH;

    this.subscribePaymentMethods();

    this.subscribeServiceChanges();

  }

}
