import {
  Component,
  OnDestroy,
}                                    from '@angular/core';

import { UserRolesRequestsService }  from '../../../../services/main/settings/user-roles-requests.service';
import { FunctionsService }          from '../../../../services/main/settings/functions.service';

import {
  FadeInOut,
  VisibilityChanged
}                                    from '../../../../config/animations.config';


@Component( {
  selector: 'user-roles',
  templateUrl: './user-roles.component.html',
  styleUrls: ['../../../filter-table/filter-table.component.scss'],
  animations: [ FadeInOut, VisibilityChanged ]
} )
export class UserRolesComponent implements OnDestroy {

  constructor(
    private userRolesService: UserRolesRequestsService,
    private functionsService: FunctionsService
  ) {}


  public ngOnDestroy(): void {

    this.userRolesService.requestDataSubject.next( {
      filterData: {
        status: '-1',
        functions: '-1'
      },
      orderData: {
        name: 'firstName',
        direction: 0
      },
      searchData: ''
    } );

    this.userRolesService.itemsList.next( [] );

    this.functionsService.itemsList.next( [] );

  }

}