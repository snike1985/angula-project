import {
  AfterViewInit,
  Component,
  OnDestroy }       from '@angular/core';
import { Subscription }               from 'rxjs/Subscription';

import { PreloaderComponent }         from '../preloader/preloader.component';

import { DataBindingService }         from '../../services/data.binding.service';

import { AuthConfig }                 from '../../config/auth.config';


@Component( {
  selector: 'access',
  templateUrl: './access.component.html',
  styleUrls: [ './access.component.scss' ]
} )
export class AccessComponent extends PreloaderComponent implements AfterViewInit, OnDestroy {

  private passSubscription: Subscription;
  private passwordToken: string;
  private authConfig = AuthConfig;

  public resetPassVisible: Object = { value: 0 };
  public lang: string;
  public texts: Object;


  constructor( protected dataBindingService: DataBindingService ) {
    super( dataBindingService );

    this.subscribePassword();
    this.getLanguage();

  }


  private getLanguage(): void {

    let lang = '';

    if ( window.navigator ) {

      if ( navigator[ 'language' ] ) {
        lang = navigator[ 'language' ];
      } else if ( navigator[ 'browserLanguage' ] ) {
        lang = navigator[ 'browserLanguage' ];
      } else if ( navigator[ 'userLanguage' ] ) {
        lang = navigator[ 'userLanguage' ];
      }

    }

    if ( lang !== 'fr_FR' ) {
      lang = 'en_EN';
    }

    this.lang = lang;
    this.texts = this.authConfig[ 'texts' ][ this.lang ];

  }

  private subscribePassword(): void {

    this.passSubscription = this.dataBindingService.passwordToken.subscribe( ( passwordToken: string ) => {

      this.setToken( passwordToken );
    });
  }

  private setToken( passwordToken ): void {

    if ( passwordToken ) {

      this.passwordToken = passwordToken;

      this.resetPassVisible[ 'value' ] = 2;

    } else {

      this.resetPassVisible[ 'value' ] = 0;
    }

  }

  private unsubscribePassword(): void {

    this.passSubscription.unsubscribe();

  }


  public ngAfterViewInit() {

    setTimeout( () => {

      this.hidePreloader();

    } );

  }

  public ngOnDestroy(): void {

    this.unsubscribePassword();

  }

}
