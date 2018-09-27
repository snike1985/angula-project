import {Component, OnDestroy, OnInit}             from '@angular/core';
import { NavigationEnd, NavigationStart, Router }   from '@angular/router';
import { Subscription }                             from 'rxjs/Subscription';

import { PreloaderComponent }                       from '../preloader/preloader.component';

import { DataBindingService }                       from '../../services/data.binding.service';

import { ErrorsConfig }                             from '../../config/errors.configs';
import { VisibilityChanged }                        from '../../config/animations.config';

@Component({
    selector: 'errors',
    templateUrl: './errors.component.html',
    styleUrls: ['./errors.component.scss'],
    animations: [ VisibilityChanged ],
})
export class ErrorsComponent extends PreloaderComponent implements OnDestroy, OnInit {

    private routerSubscription: Subscription;

    public errorType: string;
    public ErrorsConfig: Object = ErrorsConfig;
    public lang: string;
    public texts: Object;

    constructor( protected dataBindingService: DataBindingService,
                 private router: Router ) {

        super( dataBindingService );

        this.subscribeRouter();
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

        this.texts = this.ErrorsConfig[ 'texts' ][ this.lang ];

    }

    private subscribeRouter(): void {

        this.routerSubscription = this.router.events.subscribe( event => {

            if ( event instanceof NavigationEnd ) {

                this.errorType = event.urlAfterRedirects.substr( 1 ).split( '/' )[ 0 ];

            }

        });

    }

    public ngOnDestroy (): void {

        this.routerSubscription.unsubscribe();

    }

    public ngOnInit (): void {

        setTimeout( () => {

            this.hidePreloader();

        });

    }
}
