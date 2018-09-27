import {
  Component,
  ElementRef,
  Renderer2
}                                    from '@angular/core';

import { FilterTableComponent }      from '../../../../filter-table/filter-table.component';
import { Subscription }              from 'rxjs/Subscription';

import { DataBindingService }        from '../../../../../services/data.binding.service';
import { NotificationService }       from '../../../../../services/notification.service';
import { UserRolesRequestsService }  from '../../../../../services/main/settings/user-roles-requests.service';
import { FunctionsService }          from '../../../../../services/main/settings/functions.service';

import {
  FadeInOut,
  VisibilityChanged
}                                    from '../../../../../config/animations.config';
import { UserRolesConfig }           from '../../../../../config/user-roles.config';


@Component({
  selector: 'user-roles-info',
  templateUrl: './user-roles-info.component.html',
  styleUrls: [ '../../../../filter-table/filter-table.component.scss' ],
  animations: [ FadeInOut, VisibilityChanged ]
})
export class UserRolesInfoComponent extends FilterTableComponent {

  private functionsSubscription: Subscription;

  protected listName: string = 'userRoleList';

  public config = UserRolesConfig;
  public functions: any;


  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: UserRolesRequestsService,
               protected notificationService: NotificationService,
               protected elemHref: ElementRef,
               protected renderer: Renderer2,
               private functionsService: FunctionsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }


  private subscribeFunctions(): void {

    this.functionsSubscription = this.functionsService.itemsList.subscribe( functions => {

      if ( functions.length ) {

        this.functions = functions;

        this.updateFunctionsFilter();

      } else {

        this.functionsService.getSelectOptions();

      }

    } );

  }

  private updateFunctionsFilter(): void {

    let functionsFilter = this.config[ 'filter' ][ 'functions' ];

    if ( !functionsFilter[ 'completed' ] ) {

      functionsFilter[ 'options' ] = functionsFilter[ 'options' ].concat( this.functions );

      functionsFilter[ 'completed' ] = true;

    }

    this.checkFilterComplete();

  }


  protected getFilterData(): void {

    let self = this;

    this.setFilterLanguage();

    setTimeout( () => {

      self.subscribeFunctions();

    } );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.functionsSubscription.unsubscribe();

    this.view.unsubscribe();

  }


}
