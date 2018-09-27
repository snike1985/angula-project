import { Component, HostListener, OnDestroy }       from '@angular/core';
import { Subscription }                             from 'rxjs/Subscription';
import { Title }                                    from '@angular/platform-browser';
import { NavigationEnd, Router }                    from '@angular/router';

import { DataBindingService }                       from './services/data.binding.service';

import { TitleConfig }                              from './config/title.config';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: [ './app.component.scss' ]
})
export class AppComponent implements OnDestroy {

    private preloaderVisible: Subscription;
    private view: Subscription;

    public isVisiblePreloader: boolean = false;
    public viewSize: number;
    public subscriptionRouter: Subscription;
    public subscriptionGlobalSettings: Subscription;
    public subscriptionToken: Subscription;
    public currentLanguage: string;
    public currentRoute: string;
    public token: string;

    @HostListener( 'window:resize' ) onWindowResize() {

        this.setViewSize();

    }

    public constructor(
        protected dataBindingService: DataBindingService,
        protected router: Router,
        protected documentTitle: Title
    ) {

        this.subscribePreloaderVisibility();

        this.subscribeView();

        this.setViewSize();

        this.subscribeOnRouter();

        this.subscribeOnGlobalSettings();

        this.subscribeOnToken();

    }

    private setViewSize(): void {

        let windowWidth = window.innerWidth;

        if ( windowWidth >= 1200 ) {

            this.viewSize = 3;

        } else if ( windowWidth >= 1024 ) {

            this.viewSize = 2;

        } else if ( windowWidth >= 768 ) {

            this.viewSize = 1;

        } else {

            this.viewSize = 0;

        }

        this.dataBindingService.viewSize.next( this.viewSize );

    }

    private subscribePreloaderVisibility(): void {

        this.preloaderVisible = this.dataBindingService.preloaderVisible.subscribe( ( visibility: boolean ) => {

            this.isVisiblePreloader = visibility;

        } );

    }

    private subscribeView(): void {

        this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {

            this.viewSize = size;

        } );

    }

    private unsubscribeAll(): void {

        this.view.unsubscribe();

        this.preloaderVisible.unsubscribe();

        this.subscriptionRouter.unsubscribe();

        this.subscriptionGlobalSettings.unsubscribe();

        this.subscriptionToken.unsubscribe();

    }

    private setTitle( newTitle: string) {

        this.documentTitle.setTitle( newTitle );

    }

    private subscribeOnRouter() {
        this.subscriptionRouter = this.router.events.subscribe(
            (event) => {

                if ( event instanceof NavigationEnd) {

                    this.currentRoute = event['url'];

                    this.updateDocumentTitle();

                }
            }
        );
    }

    private subscribeOnGlobalSettings() {

        this.subscriptionGlobalSettings = this.dataBindingService.globalSettings.subscribe(

            ( settings ) => {

                if ( !this.token ) {

                    this.currentLanguage = this.getLanguage();

                } else {

                    if ( settings && settings['settingDto'] ) {

                        this.currentLanguage = settings['settingDto']['language'];

                        this.updateDocumentTitle();

                    }

                }

            }

        );

    }

    private updateDocumentTitle() {

        if ( this.currentRoute && this.currentLanguage ) {

            let newTitle = TitleConfig[this.currentLanguage][this.currentRoute];

            this.setTitle(newTitle);

        }

    }

    private subscribeOnToken() {

        this.subscriptionToken = this.dataBindingService.token.subscribe(

            ( token ) => {

                if ( token ) {

                    this.token = token;

                    this.currentLanguage = null;

                }

            }

        );

    }

    private getLanguage(): string {

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

        return lang;

    }


    public ngOnDestroy() {

        this.unsubscribeAll();

    }

}

