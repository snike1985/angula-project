import {
  Component,
  Input,
  OnInit
}                                   from '@angular/core';
import { FormControl }              from '@angular/forms';

import { RowStatusChangeComponent } from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }       from '../../../../../services/data.binding.service';
import { OverlayService }           from '../../../../../services/overlay.service';
import { NotificationService }      from '../../../../../services/notification.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';

import { UserRolesRowConfig }       from '../../../../../config/user-roles.config';
import { UserRole }                 from '../../../../../interfaces/user-role';


@Component( {
  selector: 'user-role-row',
  templateUrl: './user-role-row.component.html',
  styleUrls: [ './user-role-row.component.scss' ]
} )
export class UserRoleRowComponent extends RowStatusChangeComponent implements OnInit {

  @Input() public data: UserRole;


  private config = UserRolesRowConfig;

  public texts: Object;
  public isOpened: boolean;
  public loading: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: UserRolesRequestsService,
               protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }


  protected createFormControl() {

    let startValue: boolean = !this.data[ 'locked' ];


    this.prevStatus = this.data[ 'locked' ];

    this.fc = new FormControl( startValue );

    this.prevStatus = this.data[ 'locked' ];

    this.subscribeValueChanges();
  }

  protected subscribeValueChanges() {

    this.controlSubscribe = this.fc.valueChanges.subscribe( status => {

      this.data[ 'locked' ] = !status;

      this.update();

    } );

  }


  public closeDropDown(): void {

    this.isOpened = false;

  }

  public delete(): void {

    this.loading = true;

    this.rowStatusService.send( 'delete', {}, `${ this.data[ 'id' ] }` ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.fc.setValue( this.prevStatus );

        this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

      } else {

        this.rowStatusService.deleteItemById( this.data[ 'id' ] );

      }

    } );

  }

  public ngOnInit(): void {

    this.createFormControl();

    this.texts = this.config[ 'texts' ][ this.language ];

  }

  public setCurrent(): void {

    this.rowStatusService.currentItem.next( this.data );

  }

  public showDropDown(): void {

    this.isOpened = true;

  }

}
