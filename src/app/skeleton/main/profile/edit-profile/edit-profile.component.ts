import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
}                                   from '@angular/core';
import { Router }                   from '@angular/router';
import {
  FormControl,
  FormGroup,
  Validators
}                                   from '@angular/forms';

import { ProfileCommonComponent }   from '../profile-common/profile-common.component';

import { ProfileService }           from '../../../../services/main/profile/profile.service';
import { DataBindingService }       from '../../../../services/data.binding.service';
import { NotificationService }      from '../../../../services/notification.service';

import {
  FadeInOut,
  VisibilityChanged
}                                   from '../../../../config/animations.config';
import { ProfileEditConfig }        from '../../../../config/profile-edit.config';

@Component( {
  selector: 'edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: [ './edit-profile.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
} )
export class EditProfileComponent extends ProfileCommonComponent implements OnDestroy {

  private profileConfig = ProfileEditConfig;

  public editProfileForm: FormGroup;
  public failureFlag: boolean;
  public language: string;
  public texts: Object;
  public loading: boolean = false;


  constructor ( protected dataBindingService: DataBindingService,
                protected profileService: ProfileService,
                private router: Router,
                private notification: NotificationService,
                public  elemHref: ElementRef,
                public renderer: Renderer2 ) {

    super( dataBindingService, elemHref, renderer );

    this.setText();

  }


  private createForm (): void {

    this.editProfileForm = new FormGroup( {
      firstName: new FormControl( this.userData[ 'firstName' ], Validators.required ),
      lastName: new FormControl( this.userData[ 'lastName' ], Validators.required ),
      roleId: new FormControl( ( this.userRole[ 'roleId' ] ) ? this.userRole[ 'roleId' ] : this.userRoles[ 0 ][ 'value' ] ),
      email: new FormControl( this.userData[ 'email' ], [ Validators.required, Validators.email ] ),
      phone: new FormControl( this.userData[ 'mobileNum' ], [ Validators.required ] )
    } );

  }

  private getChar ( event ): string {

    if ( event.which == null ) {

      if ( event.keyCode < 32 ) {

        return null;

      }

      return String.fromCharCode( event.keyCode );

    }

    if ( event.which !== 0 && event.charCode !== 0 ) {

      if ( event.which < 32 ) {

        return null;

      }

      return String.fromCharCode( event.which );

    }

    return null;
  }

  private setChangedData ( data: Object ): void {

    this.userData[ 'firstName' ] = data[ 'firstName' ];
    this.userData[ 'lastName' ] = data[ 'lastName' ];
    this.userData[ 'email' ] = data[ 'email' ];
    this.userData[ 'mobileNum' ] = data[ 'phone' ];
    this.userData[ 'roleId' ] = data[ 'roleId' ];

  }


  protected checkLoaded (): void {

    if ( this.userData && this.userRoles ) {

      this.getCurrentUserRole();
      this.createForm();
      this.loaded = true;
      this.hideSpinner();

    }

  }

  protected setText (): void {

    this.texts = this.profileConfig[ 'texts' ][ this.language ];

  }


  public phoneOnly ( e ): boolean {
    e = e || event;

    if ( e.ctrlKey || e.altKey || e.metaKey ) {
      return;
    }

    let chr = this.getChar( e );

    if ( chr === null ) {

      return;

    }

    if ( ( chr < '0' || chr > '9' ) && ( chr !== '+' || this.editProfileForm.controls[ 'phone' ].value.length > 0 ) ) {

      return false;

    }

  }

  public setDefaultState (): void {

    this.failureFlag = false;

  };

  public submit (  { value }: any ): void {

    this.setChangedData( value );

    this.loading = true;

    this.profileService.send( 'editProfile', this.userData )
    .subscribe(
      res => {

        let dataJson = res.json();

        this.loading = false;

        if ( dataJson[ 'status' ] === 'failure' ) {

          this.failureFlag = true;
          this.notification.errorNotify( `${dataJson[ 'message' ]}` );

        } else {

          this.dataBindingService.currentData.next( { userData: this.userData } );

          this.router.navigate( [ 'profile' ] );

          this.notification.successNotify( `${dataJson[ 'message' ]}` );

        }

      },
      ( error: Object ) => {

        switch ( error[ 'status' ] ) {
          case 401:

            this.notification.errorNotify( 'Profile wasn’t changed' );

            break;

        }

      } );

  };

}
