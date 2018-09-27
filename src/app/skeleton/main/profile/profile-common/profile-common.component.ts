import { ElementRef, OnDestroy, Renderer2 }   from '@angular/core';
import { Subscription }                       from 'rxjs/Subscription';

import { ContentCommonComponent }             from '../../../content-common/content-common.component';

import { DataBindingService }                 from '../../../../services/data.binding.service';

export class ProfileCommonComponent extends ContentCommonComponent implements OnDestroy {

  protected curDataSubscription: Subscription;
  protected userRolesSubscription: Subscription;
  protected userRoles: Object[];

  public loaded: boolean = false;
  public userData: Object;
  public userRole: Object = {};


  constructor( protected dataBindingService: DataBindingService,
               public  elemHref: ElementRef,
               public renderer: Renderer2 ) {

    super( dataBindingService, elemHref, renderer );

    this.subscribeCurData();
    this.subscribeUserRoles();

  }


  protected checkLoaded(): void {

    if ( this.userData && this.userRoles ) {

      this.getCurrentUserRole();
      this.loaded = true;
      this.hideSpinner();

    }

  }


  protected getCurrentUserRole(): void {

    if ( this.userData[ 'roleId' ] ) {

      for ( let role of this.userRoles ) {

        if ( role[ 'value' ] === this.userData[ 'roleId' ] ) {
          this.userRole = role;
          break;
        }

      }

    }

  }

  protected subscribeCurData() {

    this.curDataSubscription = this.dataBindingService.currentData.subscribe( ( data ) => {

      if ( data ) {

        this.userData = data[ 'userData' ];
        this.checkLoaded();

      }

    } );

  };

  protected subscribeUserRoles() {

    this.userRolesSubscription = this.dataBindingService.userRoles.subscribe( ( userRoles ) => {

      if ( userRoles ) {

        this.userRoles = userRoles;
        this.checkLoaded();

      }

    } );

  };

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
    this.curDataSubscription.unsubscribe();
    this.userRolesSubscription.unsubscribe();

  }

}
