import {
  Component,
  OnInit
}                          from '@angular/core';
import { Subscription }             from 'rxjs/Subscription';

import { PopupInnerComponent }      from '../../../../popup-inner/popup-inner.component';

import { UsersRequestsService }     from '../../../../../services/main/settings/users-requests.service';
import { DataBindingService }       from '../../../../../services/data.binding.service';
import { OverlayService }           from '../../../../../services/overlay.service';

import { UserResetPasswordConfig }  from '../../../../../config/users.config';

import { User }                     from '../../../../../interfaces/user';
import { NotificationService } from '../../../../../services/notification.service';


@Component( {
  selector: 'user-reset-password',
  templateUrl: './user-reset-password.component.html',
  styleUrls: [ './user-reset-password.component.scss' ]
} )
export class UserResetPasswordComponent extends PopupInnerComponent implements OnInit {

  private currentUserSubscription: Subscription;

  protected config = UserResetPasswordConfig;

  public currentUser: User;
  public title: string;
  public state: number = 0;


  constructor( private usersService: UsersRequestsService,
               protected overlayService: OverlayService,
               protected notification: NotificationService,
               protected dataBindingService: DataBindingService ) {

    super( dataBindingService, overlayService );

    this.subscribeCurrentUser();

  }


  private getFirstTitle(): void {

    this.title = this.texts[ 'title' ];

  }

  private subscribeCurrentUser(): void {

    this.currentUserSubscription = this.usersService.currentItem.subscribe( ( user: User ) => {

      this.currentUser = user;

    } );

  }


  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.currentUserSubscription.unsubscribe();

  }


  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];
    this.getFirstTitle();

  }

  public reset(): void {

    this.state = 1;

    this.usersService.send( 'resetPassword', {}, `${ this.currentUser[ 'id' ] }` ).subscribe( res => {

      let dataJson = res.json();

      if ( dataJson[ 'status' ] === 'failure' ) {

        this.state = 0;

        this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

      } else {

        this.state = 2;

      }

    } );

  }

}
