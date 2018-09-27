import { Component, OnDestroy }             from '@angular/core';
import { Subscription }                     from 'rxjs/Subscription';
import {
  NavigationEnd,
  NavigationStart,
  Router }                                  from '@angular/router';


import { MainSpinnerComponent }             from '../spinner/spinner.component';

import { DataBindingService }               from '../../services/data.binding.service';
import { ViewingSettingsService }           from '../../services/main/settings/viewing-settings.service';

import { SlideInLeft, VisibilityChanged }   from '../../config/animations.config';

import { GlobalSettings }                   from '../../interfaces/global-settings';

@Component({
  selector: 'main',
  templateUrl: './main.component.html',
  styleUrls: [ './main.component.scss' ],
  animations: [ VisibilityChanged, SlideInLeft ]
})
export class MainComponent extends MainSpinnerComponent implements OnDestroy {

  private view: Subscription;
  private menu: Subscription;
  private mainSpinner: Subscription;
  private routerSubscription: Subscription;
  private htmlTag = document.getElementsByTagName('HTML')[0];

  public isVisible: boolean = true;
  public viewSize: number;
  public menuVisible: boolean = false;
  public globalSettings: GlobalSettings;


  constructor(
    private router: Router,
    protected dataBindingService: DataBindingService,
    private viewingSettingsService: ViewingSettingsService ) {

    super( dataBindingService );

    this.getGlobalSettings();

    this.subscribeRouter();

    this.subscribeView();

    this.subscribeMenuVisibility();

    this.subscribeSpinnerVisibility();

  }


  private getGlobalSettings(): void {

    this.viewingSettingsService.send( 'get' ).subscribe(
      res => {

        let dataJson = res.json();

        if ( dataJson[ 'status' ] === 'failure' ) {

          this.router.navigate( [ 'server-error' ] );

        } else {

          this.globalSettings = dataJson[ 'data' ];

          this.dataBindingService.globalSettings.next( this.globalSettings );

          this.hidePreloader();

        }

      },
      ( error: Object ) => {

        switch ( error[ 'status' ] ) {
          case 401:

            break;
        }
      }
    );

  }

  private subscribeRouter(): void {

    this.routerSubscription = this.router.events.subscribe( event => {

      if ( event instanceof NavigationEnd ) {

        if ( this.viewSize < 1 ) {

          this.menuVisible = false;

          this.dataBindingService.menuVisible.next( this.menuVisible );

        }

      }

      if ( event instanceof NavigationStart ) {

        this.showSpinner();

      }

    });

  }

  private subscribeSpinnerVisibility() {

    this.mainSpinner = this.dataBindingService.mainSpinnerVisible.subscribe( ( visibleState: boolean ) => {

      this.isVisible = visibleState;

    });

  }

  private subscribeMenuVisibility() {

    this.menu = this.dataBindingService.menuVisible.subscribe( ( visibleState: boolean ) => {

      this.menuVisible = visibleState;

      this.blockedScroll( this.menuVisible );

    });

  }

  private subscribeView(): void {

    this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {

      this.viewSize = size;

    } );

  }

  private unsubscribeAll() {

    this.menu.unsubscribe();

    this.mainSpinner.unsubscribe();

    this.view.unsubscribe();

    this.routerSubscription.unsubscribe();

  }

  private blockedScroll( state: boolean ) {

    if ( state ) {

      this.htmlTag['style'].overflow = 'hidden';

    } else {

      this.htmlTag['style'].overflow = '';

    }

  }


  public showHideMenu(): void {

    this.menuVisible = !this.menuVisible;

    this.dataBindingService.menuVisible.next( this.menuVisible );

  }

  public ngOnDestroy(): void {

    this.unsubscribeAll();

  }

}
