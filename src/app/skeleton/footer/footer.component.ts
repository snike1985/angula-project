import { Component,
    Injectable,
    Input,
    OnDestroy,
    OnInit }                        from '@angular/core';
import { Router }                   from '@angular/router';
import { Subscription }             from 'rxjs/Subscription';

import { DataBindingService }       from '../../services/data.binding.service';

import { FooterConfig }             from '../../config/footer.configs';

import { GlobalSettings }           from '../../interfaces/global-settings';

@Component({
    selector: 'main-footer',
    templateUrl: './footer.component.html',
    styleUrls: [ './footer.component.scss' ]
})

@Injectable()

export class FooterComponent implements OnInit, OnDestroy {

    @Input() lang: string;

    private settingsSubscription: Subscription;
    private view: Subscription;

    public isHomePage: boolean;
    public viewSize: number;
    public globalSettings: Object;
    public language: string;
    public footerConfig: Object = FooterConfig;
    public texts: Object;

    constructor( private router: Router,
                 protected dataBindingService: DataBindingService ) {

        this.subscribeView();

        this.checkUrl();

    }

    private checkRoute( path ): void {

        this.isHomePage = true;

        switch ( path ) {
            case 'auth':

                this.isHomePage = false;

                break;
            case '404':

                this.isHomePage = false;

                break;
            case 'access-denied':

                this.isHomePage = false;

                break;
            case 'server-error':

                this.isHomePage = false;

                break;
            case 'session-expired':

                this.isHomePage = false;

                break;
            case 'server-maintenance':

                this.isHomePage = false;

                break;
        }

    }

    private checkUrl(): void {

        let path = this.router.routerState.snapshot.url.split( '/' )[ 1 ];

        this.checkRoute( path );
    }

    private subscribeSettings(): void {

        this.settingsSubscription = this.dataBindingService.globalSettings.subscribe( ( settings: GlobalSettings ) => {

            this.globalSettings = settings;
            this.language = this.globalSettings[ 'settingDto' ][ 'language' ];

        });

        this.texts = this.footerConfig[ 'texts' ][ this.language ];

    }

    private subscribeView(): void {

        this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {
            this.viewSize = size;
        } );

    }

    private unsubscribeAll(): void {

        this.view.unsubscribe();

        if ( this.globalSettings ) {

            this.settingsSubscription.unsubscribe();

        }

    }


    protected setText(): void {

        let language = '';

        if ( this.lang ) {

            language = this.lang;

            this.texts = this.footerConfig[ 'texts' ][ language ];

        } else {

            this.subscribeSettings();

        }

    }


    public ngOnInit(): void {

        this.setText();

    }

    public ngOnDestroy(): void {

        this.unsubscribeAll();

    }

}
