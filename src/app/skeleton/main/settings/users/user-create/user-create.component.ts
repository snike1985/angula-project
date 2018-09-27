import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  Validators
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { CreateEditComponent } from '../../../../create-edit/create-edit.component';

import { NotificationService } from '../../../../../services/notification.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';
import { UsersRequestsService } from '../../../../../services/main/settings/users-requests.service';
import { OverlayService } from '../../../../../services/overlay.service';

import { UsersCreateConfig } from '../../../../../config/users.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';

import { User } from '../../../../../interfaces/user';


@Component( {
  selector: 'user-create',
  templateUrl: './user-create.component.html',
  styleUrls: [ './user-create.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class UserCreateComponent extends CreateEditComponent {

  private userRoleOptionsSubscription: Subscription;

  protected pathAfterRemove: string[] = [
    'settings',
    'users'
  ];

  public config = UsersCreateConfig;
  public currentItem: User = {
    id: null,
    email: '',
    mobileNum: '',
    lastName: '',
    firstName: '',
    roleId: null,
    locked: false
  };
  public fg: FormGroup;
  public loaded: boolean = false;
  public userRoles: any;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: UsersRequestsService,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService,
    protected location: Location,
    private userRolesService: UserRolesRequestsService ) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.config = UsersCreateConfig;

    this.subscribeUserRoleOptions();

  }


  private getChar( event ): string {

    if ( event.which == null ) {

      if ( event.keyCode < 32 ) {

        return null;

      }

      return String.fromCharCode( event.keyCode );

    }

    if ( event.which !== 0 && event.charCode !== 0 ) {

      if ( event.which < 32 ) {

        return null;

      }

      return String.fromCharCode( event.which );

    }

    return null;
  }

  private setData( data: Object ): void {

    this.currentItem[ 'firstName' ] = data[ 'firstName' ];
    this.currentItem[ 'lastName' ] = data[ 'lastName' ];
    this.currentItem[ 'email' ] = data[ 'email' ];
    this.currentItem[ 'mobileNum' ] = data[ 'mobileNum' ];
    this.currentItem[ 'locked' ] = !data[ 'locked' ];
    this.currentItem[ 'roleId' ] = data[ 'roleId' ];

  }

  private subscribeUserRoleOptions(): void {

    this.userRoleOptionsSubscription = this.userRolesService.selectOptionsSubject.subscribe( data => {

      if ( data ) {

        this.userRoles = data;

        this.checkView();

      } else {

        this.userRolesService.getSelectOptions();

      }

    } );

  }


  protected create( value ): void {

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

  protected createFormGroup() {

    let roleId = this.currentItem[ 'roleId' ],
      locked = !this.currentItem[ 'locked' ];

    if ( !roleId || roleId[ 'value' ] === -1 ) {

      roleId = this.userRoles[ 0 ][ 'value' ];

    }

    this.fg = new FormGroup( {
      firstName: new FormControl( this.currentItem[ 'firstName' ], Validators.required ),
      lastName: new FormControl( this.currentItem[ 'lastName' ], Validators.required ),
      roleId: new FormControl( roleId ),
      email: new FormControl( this.currentItem[ 'email' ], [
        Validators.required,
        Validators.email
      ] ),
      mobileNum: new FormControl( this.currentItem[ 'mobileNum' ] || '', [ Validators.required ] ),
      locked: new FormControl( locked )
    } );


    this.startData = this.fg.value;

    this.hideSpinner();

  }

  protected edit( value ): void {

    this.loaded = true;

    this.setData( value );

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


  public phoneOnly( e ): boolean {
    e = e || event;

    if ( e.ctrlKey || e.altKey || e.metaKey ) {
      return;
    }

    let chr = this.getChar( e );

    if ( chr === null ) {

      return;

    }

    if ( ( chr < '0' || chr > '9' ) && ( chr !== '+' || this.fg.controls[ 'mobileNum' ].value.length > 0 ) ) {

      return false;

    }

  }

  public remove(): void {

    let id = this.currentItem[ 'id' ];

    this.itemsService.send( 'delete', {}, `${ id }` )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

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

}
