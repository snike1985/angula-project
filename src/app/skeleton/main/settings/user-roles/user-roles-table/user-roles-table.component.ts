import {
  Component,
  Renderer2
}                                     from '@angular/core';

import { CustomTableComponent }       from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }         from '../../../../../services/data.binding.service';
import { UserRolesRequestsService }   from '../../../../../services/main/settings/user-roles-requests.service';

@Component( {
  selector: 'user-roles-table',
  templateUrl: './user-roles-table.component.html',
  styleUrls: [ './user-roles-table.component.scss' ]
} )

export class UserRolesTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
                protected itemsService: UserRolesRequestsService,
                protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
