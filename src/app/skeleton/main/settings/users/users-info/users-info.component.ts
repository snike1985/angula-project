import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';

import { FilterTableComponent } from '../../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { UsersRequestsService } from '../../../../../services/main/settings/users-requests.service';
import { NotificationService } from '../../../../../services/notification.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';

import { UsersConfig } from '../../../../../config/users.config';
import {
  FadeInOut,
  VisibilityChanged
} from '../../../../../config/animations.config';
import { Subscription } from 'rxjs/Subscription';


@Component( {
  selector: 'users-info',
  templateUrl: './users-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [
    FadeInOut,
    VisibilityChanged
  ]
} )
export class UsersInfoComponent extends FilterTableComponent {

  private userRoleOptionsSubscription: Subscription;

  protected listName: string = 'usersList';

  public config = UsersConfig;
  public userRoles: any;

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: UsersRequestsService,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2,
    private userRolesService: UserRolesRequestsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }


  private subscribeUserRoleOptions(): void {

    this.userRoleOptionsSubscription = this.userRolesService.selectOptionsSubject.subscribe( data => {

      if ( data ) {

        this.userRoles = data;

        this.updateUserRoleFilter();

      } else {

        this.userRolesService.getSelectOptions();

      }

    } );

  }

  private updateUserRoleFilter(): void {

    let userRolesFilter = this.config[ 'filter' ][ 'userRoles' ];

    if ( !userRolesFilter[ 'completed' ] ) {

      userRolesFilter[ 'options' ] = userRolesFilter[ 'options' ].concat( this.userRoles );

      userRolesFilter[ 'completed' ] = true;

    }

    this.checkFilterComplete();

  }


  protected getFilterData(): void {

    this.setFilterLanguage();

    setTimeout( () => {

      this.subscribeUserRoleOptions();

    } );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

    this.userRoleOptionsSubscription.unsubscribe();

  }

}
