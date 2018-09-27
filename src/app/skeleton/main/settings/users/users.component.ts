import {
  Component,
  OnDestroy,
}                                from '@angular/core';

import { UsersRequestsService }  from '../../../../services/main/settings/users-requests.service';
import { UserRolesRequestsService } from '../../../../services/main/settings/user-roles-requests.service';


@Component( {
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ]
} )
export class UsersComponent implements OnDestroy {

  constructor( private usersService: UsersRequestsService,
               private userRolesService: UserRolesRequestsService ) {}


  public ngOnDestroy(): void {

    this.usersService.requestDataSubject.next( {
      filterData: {
        status: '-1',
        userRoles: '-1'
      },
      orderData: {
        name: 'firstName',
        direction: 0
      },
      searchData: ''
    } );
    this.usersService.itemsList.next( [] );
    this.userRolesService.selectOptionsSubject.next( null );

  }

}
