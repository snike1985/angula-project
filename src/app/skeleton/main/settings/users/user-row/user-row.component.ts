import {
  Component,
  Input,
  OnInit
}      from '@angular/core';
import { FormControl }                 from '@angular/forms';

import { RowStatusChangeComponent }    from '../../../../row-status-change/row-status-change.component';

import { DataBindingService }          from '../../../../../services/data.binding.service';
import { NotificationService }         from '../../../../../services/notification.service';
import { UsersRequestsService }        from '../../../../../services/main/settings/users-requests.service';
import { OverlayService }              from '../../../../../services/overlay.service';

import { UserRowConfig }               from '../../../../../config/users.config';
import { UserResetPasswordComponent }  from '../user-reset-password/user-reset-password.component';

import { User }                        from '../../../../../interfaces/user';

@Component( {
  selector: 'user-row',
  templateUrl: './user-row.component.html',
  styleUrls: [ './user-row.component.scss' ]
} )
export class UserRowComponent extends RowStatusChangeComponent implements OnInit {

  @Input() public role: string;
  @Input() public data: User;

  private config = UserRowConfig;

  public texts: Object;
  public isOpened: boolean;
  public loading: boolean = false;


  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: UsersRequestsService,
               private ovelayService: OverlayService,
               protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }


  protected createFormControl() {

    this.fc = new FormControl( !this.data[ 'locked' ] );

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

        this.loading = false;

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

  public resetPassword(): void {

    this.rowStatusService.currentItem.next( this.data );

    this.ovelayService.activePopup$.next( 'UserResetPasswordComponent' );

  }

  public setCurrent(): void {

    this.rowStatusService.currentItem.next( this.data );

  }

  public showDropDown(): void {

    this.isOpened = true;

  }

}
