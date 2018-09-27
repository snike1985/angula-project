import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
}                                        from '@angular/core';
import {
  NavigationStart,
  Router
}       from '@angular/router';
import { Subscription }                  from 'rxjs/Subscription';

import { ProfileCommonComponent }        from '../profile-common/profile-common.component';

import { DataBindingService }            from '../../../../services/data.binding.service';

import { ProfileInfoConfig }             from '../../../../config/profile-info.config';
import {
  FadeInOut,
  VisibilityChanged
}                                        from '../../../../config/animations.config';

@Component( {
  selector: 'profile-info',
  templateUrl: './profile-info.component.html',
  styleUrls: [ './profile-info.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
} )
export class ProfileInfoComponent extends ProfileCommonComponent implements OnDestroy {

  private routerSubscription: Subscription;
  private profileConfig = ProfileInfoConfig;

  public texts: Object;
  public menu = this.profileConfig[ 'menu' ];

  constructor( protected dataBindingService: DataBindingService,
               private router: Router,
               public  elemHref: ElementRef,
               public renderer: Renderer2 ) {

    super( dataBindingService, elemHref, renderer );

    this.setText();

    this.subscribeRouter();

  }


  private subscribeRouter(): void {

    this.routerSubscription = this.router.events.subscribe( event => {

      if ( event instanceof NavigationStart ) {

        if ( event[ 'url' ] === '/auth' ) {

          this.dataBindingService.token.next( null );
          window.localStorage.removeItem( 'auth_token' );

        }

      }

    } );

  }


  protected setText(): void {

    this.texts = this.profileConfig[ 'texts' ][ this.language ];

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
    this.curDataSubscription.unsubscribe();
    this.routerSubscription.unsubscribe();

  }

}
