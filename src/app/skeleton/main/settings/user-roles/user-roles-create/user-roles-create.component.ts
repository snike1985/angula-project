import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Location } from '@angular/common';

import { CreateEditComponent } from '../../../../create-edit/create-edit.component';

import { NotificationService } from '../../../../../services/notification.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { FunctionsService } from '../../../../../services/main/settings/functions.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { UserRolesCreateConfig } from '../../../../../config/user-roles.config';

import { UserRole } from '../../../../../interfaces/user-role';

import { SelectOptions } from '../../../../../interfaces/select-options';


@Component( {
  selector: 'user-roles-create',
  templateUrl: './user-roles-create.component.html',
  styleUrls: [ './user-roles-create.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class UserRolesCreateComponent extends CreateEditComponent implements OnDestroy {

  private addFunctionsControl: FormControl;
  private functionsSubscription: Subscription;

  protected pathAfterRemove: string[] = [
    'settings',
    'user-roles'
  ];

  public currentItem: UserRole = {
    id: null,
    name: '',
    description: '',
    locked: false,
    roleFunctions: []
  };
  public fg: FormGroup;
  public fgPermissions: FormGroup;
  public loaded: boolean = false;
  public functions: SelectOptions[];
  public selectedFunctions: SelectOptions[] = [];


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: UserRolesRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,
    private functionsService: FunctionsService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.config = UserRolesCreateConfig;

    this.subscribeFunctions();

  }


  private checkStartFunctions(): boolean {

    let selectedFunctions = [];

    for ( let controlKey in this.fgPermissions.controls ) {

      selectedFunctions.push( this.fgPermissions.controls[ controlKey ].value );

    }
    console.log( JSON.stringify( selectedFunctions ) );
    console.log( JSON.stringify( this.currentItem[ 'roleFunction' ] ) );

    return JSON.stringify( this.currentItem[ 'roleFunction' ] ) === JSON.stringify( selectedFunctions );

  }

  private setData( data: Object ): void {

    this.currentItem[ 'name' ] = data[ 'name' ];
    this.currentItem[ 'description' ] = data[ 'description' ];
    this.currentItem[ 'locked' ] = !data[ 'locked' ];

    this.currentItem[ 'roleFunctions' ] = [];

    for ( let controlKey in this.fgPermissions.controls ) {

      this.currentItem[ 'roleFunctions' ].push( this.fgPermissions.controls[ controlKey ].value );

    }

  }

  private subscribeFunctions(): void {

    this.functionsSubscription = this.functionsService.itemsList.subscribe( functions => {

      if ( functions.length ) {

        this.functions = functions;

        this.checkView();

      } else {

        this.functionsService.getSelectOptions();

      }

    } );

  }


  protected create( { value } ): void {

    this.loaded = true;

    this.setData( value );

    this.itemsService.send( 'insert', this.currentItem )
        .subscribe( res => {

          this.loaded = false;

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

          } else {
            let path = [
              ...this.pathAfterRemove,
              ...[
                dataJson[ 'data' ][ 'id' ],
                'edit'
              ]
            ];

            this.router.navigate( path );
            this.notification.successNotify( `${ dataJson[ 'message' ] }` );

          }

        } );

  }

  protected createAddFunctionControl(): void {

    this.addFunctionsControl = new FormControl();

  }

  protected createFormGroup() {

    let locked = !this.currentItem[ 'locked' ];


    this.fg = new FormGroup( {
      name: new FormControl( this.currentItem[ 'name' ], Validators.required ),
      description: new FormControl( this.currentItem[ 'description' ] ),
      locked: new FormControl( locked )
    } );

    this.createAddFunctionControl();

    this.createFgPermissions();

    this.checkExistingRoles();

    this.startData = this.fg.value;

  }

  protected createFgPermissions() {

    this.fgPermissions = new FormGroup( {} );

    this.hideSpinner();

  }

  protected edit( { value } ): void {

    this.setData( value );

    this.loaded = true;

    this.itemsService.send( 'update', this.currentItem, `${ this.currentItem[ 'id' ] }` )
        .subscribe( res => {

          this.loaded = false;

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

          } else {

            this.itemsService.updateItem( this.currentItem );
            this.router.navigate( this.pathAfterRemove );
            this.notification.successNotify( `${ dataJson[ 'message' ] }` );

          }

        } );

  }


  public addFormControlToPermissionGroup( role: any, crud?: Object ): void {

    if ( typeof( role ) === 'number' ) {

      console.log( this.selectedFunctions );

      let functionName = this.selectedFunctions.filter( function( functionElement ) {

        return ( functionElement[ 'value' ] === role+ '' );

      } );

      console.log( functionName );


      // if ( !crud || crud === undefined ) {
      //   crud = {
      //     canCreate: false,
      //     canView: true,
      //     canModify: false,
      //     canDelete: false
      //   };
      // }
      //
      // this.fgPermissions.setControl( role[ 'id' ].toString(), new FormControl( {
      //   id: role[ 'id' ],
      //   function: {
      //     id: role[ 'function' ][ 'id' ],
      //     code: role[ 'function' ][ 'code' ]
      //   },
      //   canView: crud[ 'canView' ],
      //   canCreate: crud[ 'canCreate' ],
      //   canModify: crud[ 'canModify' ],
      //   canDelete: crud[ 'canDelete' ]
      // } ) );

    } else {
      if ( !crud || crud === undefined ) {
        crud = {
          canCreate: false,
          canView: true,
          canModify: false,
          canDelete: false
        };
      }

      this.fgPermissions.setControl( role[ 'id' ].toString(), new FormControl( {
        id: role[ 'id' ],
        function: {
          id: role[ 'function' ][ 'id' ],
          code: role[ 'function' ][ 'code' ]
        },
        canView: crud[ 'canView' ],
        canCreate: crud[ 'canCreate' ],
        canModify: crud[ 'canModify' ],
        canDelete: crud[ 'canDelete' ]
      } ) );
    }

  }

  public addFunction( role: Object, crud?: Object ): void {

    this.switchFunctionFromAvailableFunctions( +role[ 'id' ] );

    this.addFormControlToPermissionGroup( role, crud );

  }

  public back(): void {

    if ( ( JSON.stringify( this.fg.value ) === JSON.stringify( this.startData ) ) && this.checkStartFunctions() ) {

      this.router.navigate( this.pathAfterRemove );

    } else {

      this.comingBack = true;

      this.subscribeConfirm();

      this.overlayService.activePopup$.next( 'DiscardComponent' );

    }

  }

  public cancel(): void {

    if ( ( JSON.stringify( this.fg.value ) === JSON.stringify( this.startData ) ) && this.checkStartFunctions() ) {

      this.location.back();

    } else {

      this.subscribeConfirm();

      this.overlayService.activePopup$.next( 'DiscardComponent' );


    }

  }

  public remove(): void {

    let id = this.currentItem[ 'id' ];

    this.loaded = true;

    this.itemsService.send( 'delete', {}, `${ id }` )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.loaded = false;

            this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

          } else {

            this.itemsService.deleteItemById( id );

            this.router.navigate( [
              'settings',
              'users'
            ] );

            this.notification.successNotify( `${ dataJson[ 'message' ] }` );

          }

        } );

  }

  public removeFormControlToPermissionGroup( controlName: any ): void {

    this.fgPermissions.removeControl( controlName );

  }

  public removeFunction( functionID: number ): void {

    this.switchFunctionToAvailableFunctions( functionID );

    this.removeFormControlToPermissionGroup( functionID );

  };

  public switchFunctionFromAvailableFunctions( functionID: number ): void {

    let self = this;

    this.functions = this.functions.filter( function( functionElement ) {

      if ( `${ functionElement[ 'value' ] }` !== `${ functionID }` ) {

        return true;

      } else {

        self.selectedFunctions.push( functionElement );

        return false;

      }

    } );

  }

  public switchFunctionToAvailableFunctions( functionID: number ): void {

    let self = this;

    this.selectedFunctions = this.selectedFunctions.filter( function( functionElement ) {

      if ( `${ functionElement[ 'value' ] }` !== `${ functionID }` ) {

        return true;

      } else {

        self.functions.push( functionElement );

        return false;

      }

    } );

  }

  public checkExistingRoles(): void {

    if ( this.currentItem[ 'roleFunction' ] ) {

      for ( let role of this.currentItem[ 'roleFunction' ] ) {

        this.addFunction( role, {
          canView: role[ 'canView' ],
          canCreate: role[ 'canCreate' ],
          canModify: role[ 'canModify' ],
          canDelete: role[ 'canDelete' ]
        } );

      }

    }

  }

}
