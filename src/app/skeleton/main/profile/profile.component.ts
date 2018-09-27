import {Component, ElementRef, OnDestroy, Renderer2}   from '@angular/core';

import { ContentCommonComponent }     from '../../content-common/content-common.component';

import { DataBindingService }         from '../../../services/data.binding.service';
import { ProfileService }             from '../../../services/main/profile/profile.service';
import { UserRolesRequestsService }   from '../../../services/main/settings/user-roles-requests.service';


@Component({
  selector: 'profile',
  templateUrl: './profile.component.html'
})
export class ProfileComponent extends ContentCommonComponent implements OnDestroy {

  public userData: Object;


  constructor( protected dataBindingService: DataBindingService,
               private userRolesService: UserRolesRequestsService,
               protected profileService: ProfileService,
               public  elemHref: ElementRef,
               public renderer: Renderer2) {

    super( dataBindingService, elemHref, renderer );

    this.getUserRoles();

    this.getUserData();

  }


  private clearData(): void {

    this.dataBindingService.currentData.next( null );
    this.dataBindingService.userRoles.next( null );

  }

  private getUserData(): void {

    this.profileService.send( 'getUser' )
      .subscribe(
        res => {

          this.dataBindingService.currentData.next( { userData: res.json()[ 'data' ] } );

        }
      );

  }

  private getUserRoles(): void {

    this.userRolesService.send( 'getOptions' )
      .subscribe(
        res => {

          this.dataBindingService.userRoles.next( res.json()[ 'data' ][ 'userRoleList' ].map( ( data ) => {

            return { value: data['id'], text: data[ 'name' ] };

          } ) );

        }
      );
  }


  public ngOnDestroy(): void {

    this.clearData();

  }

}
