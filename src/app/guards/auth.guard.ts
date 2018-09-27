import { Injectable }               from '@angular/core';
import {
    CanActivate,
    Router,
    RouterStateSnapshot,
    ActivatedRouteSnapshot
}                                   from '@angular/router';
import {Subscription}               from 'rxjs/Subscription';

import { DataBindingService }       from '../services/data.binding.service';
import { AuthService }              from '../services/auth.service';


@Injectable()
export class AuthGuard implements CanActivate {

  private userData: Object;
  private userDataSubscription: Subscription;

  constructor( private router: Router, private dataBindingService: DataBindingService, private authService: AuthService ) {

    this.subscribeUserData();

  }

  private subscribeUserData(): void {

    this.userDataSubscription = this.dataBindingService.me.subscribe( me => {

      this.userData = me;

    } );

  };


  public canActivate( route: ActivatedRouteSnapshot, state: RouterStateSnapshot ): any {

    let token = window.localStorage.getItem( 'auth_token' ),
        path = state.url.split( '?' ),
        url = path[ 0 ],
        search = path[ 1 ],
        passwordToken = null;

    if ( search ) {

        let params = search.split( '&' );

        for ( let param of params ) {

            let innerParam = param.split( '=' );

            if ( innerParam[ 0 ] === 'token' ) {
                passwordToken = innerParam[ 1 ];
                break;
            }
        }
    }

    if ( passwordToken ) {

        if ( url === '/auth' ) {

            this.dataBindingService.passwordToken.next( passwordToken );

        } else if ( !token ) {

            this.router.navigate( [ 'auth' ] );
            return false;
        }

    } else {

        if ( token ) {

          if ( url === '/auth' ) {

              this.router.navigate( [ '/' ] );
              return false;
          }

          this.dataBindingService.token.next( token );


          if ( !this.userData[ 'email' ] ) {

            return this.authService.send( 'refreshUser' ).map(
              msg => {

                let dataJson = msg.json();

                this.dataBindingService.me.next( dataJson[ 'data' ] );

                return true;

              },
              ( error: Object ) => {

                this.router.navigate( [ 'auth' ] );
                return false;

              }
            ).first();

          }

        } else {

            if ( url !== '/auth' ) {

                this.router.navigate( [ 'auth' ] );
                return false;
            }
        }
    }

    return true;

  }

}
