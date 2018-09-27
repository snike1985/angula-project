import { Injectable }               from '@angular/core';
import {
    CanActivate,
    Router,
    ActivatedRouteSnapshot
}                                   from '@angular/router';
import { Subscription }             from 'rxjs/Subscription';

import { DataBindingService }       from '../services/data.binding.service';


@Injectable()
export class DesktopGuard implements CanActivate {

  protected view: Subscription;
  public viewSize: any;

  constructor( private router: Router,
               private dataBindingService: DataBindingService ) {

    this.subscribeView();

  }

  protected subscribeView(): void {

    this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {

      this.viewSize = size;

    } );

  }

  public canActivate( route: ActivatedRouteSnapshot ): any {

    let path = route.url[0].path,
        activate = true;

    if ( this.viewSize < 3 ) {

      switch ( path ) {
        case 'institutions':

          this.router.navigate( [ 'auth' ] );
          activate = false;

          break;
        case 'logs':

          this.router.navigate( [ 'auth' ] );
          activate = false;

          break;
        case 'routing':

          this.router.navigate( [ 'auth' ] );
          activate = false;

          break;
      }

    }

    return activate;

  }

}
