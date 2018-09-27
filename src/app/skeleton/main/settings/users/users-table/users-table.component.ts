import {
  Component,
  Renderer2
}             from '@angular/core';

import { CustomTableComponent }  from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }    from '../../../../../services/data.binding.service';
import { UsersRequestsService } from '../../../../../services/main/settings/users-requests.service';
import { UserRolesRequestsService } from '../../../../../services/main/settings/user-roles-requests.service';
import { Subscription } from 'rxjs/Subscription';
import { SelectOptions } from '../../../../../interfaces/select-options';

@Component( {
  selector: 'users-table',
  templateUrl: './users-table.component.html',
  styleUrls: [ './users-table.component.scss' ]
} )
export class UsersTableComponent extends CustomTableComponent {

  private userRoleOptionsSubscription: Subscription;
  private userRoles: SelectOptions[];


  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: UsersRequestsService,
               protected renderer: Renderer2,
               private userRolesService: UserRolesRequestsService ) {

    super( dataBindingService, itemsService, renderer );

    this.subscribeUserRoleOptions();

  }

  private subscribeUserRoleOptions(): void {

    this.userRoleOptionsSubscription = this.userRolesService.selectOptionsSubject.subscribe( ( options: SelectOptions[] ) => {

      this.userRoles = options;

    } );

  }


  public getUserRole( value ): string {

    for ( let role of this.userRoles ) {

      if ( role[ 'value' ] === value ) {

        return role[ 'text' ];

      }

    }

    return 'No role';
  }

}
