import { Component, ViewChild, OnDestroy }          from '@angular/core';
import { Subscription }                             from 'rxjs/Subscription';
import { NavigationEnd, NavigationStart, Router }   from '@angular/router';

import { DataBindingService }                       from '../../../services/data.binding.service';

import { PerfectScrollbarDirective }                from 'ngx-perfect-scrollbar';

import { MenuConfig }                               from '../../../config/menu.configs';
import { GlobalSettings }                           from '../../../interfaces/global-settings';

@Component({
    selector: 'menu',
    templateUrl: './menu.component.html',
    styleUrls: [ './menu.component.scss' ]
})
export class MenuComponent implements OnDestroy {

  @ViewChild( PerfectScrollbarDirective ) directiveScroll;

  private routerSubscription: Subscription;
  private meSubscription: Subscription;
  private view: Subscription;
  private menu: Subscription;
  private globalSettings: Subscription;

  public itemsActiveArray = [];
  public language: any;
  public menuConfig: Object = MenuConfig[ 'items' ];
  public menuArray = [];
  public menuVisible: boolean;
  public viewSize: number;
  public me: Object;

  constructor( private router: Router,
               protected dataBindingService: DataBindingService ) {

    this.subscribeGlobalSettings();

    this.subscribeMe();

    this.subscribeView();

    this.subscribeMenuVisibility();

    this.menuArray = this.fillFalseArr();

    this.subscribeRouter();

    this.checkUrl();

  }

  private checkUrl(): void {

      let path = this.router.routerState.snapshot.url.split( '/' )[ 1 ];

      this.updateMenuState( path );
  }

  private createItemsActiveArray(): void {

      this.itemsActiveArray = this.fillFalseArr();

  }

  private createMenuArray(): void {

      this.menuArray = this.fillFalseArr();

  }

  private fillFalseArr(): boolean[] {

      let menuItems = this.menuConfig[ 'menuItems' ],
          arr = [];

      for ( let index in menuItems ) {

          arr[ index ] = false;

      }

      return arr;

  }

  private updateMenuState( path: string ): void {

      let route = path;

      this.createMenuArray();
      this.createItemsActiveArray();

      let menuItems: Object = this.menuConfig[ 'menuItems' ];

      for ( let index in menuItems ) {

          let curPath = menuItems[ index ][ 'path' ];

          if ( curPath === `/${route}` ) {

              this.menuArray[ index ] = true;

              this.itemsActiveArray[ index ] = true;

          }

      }

  }

  private subscribeGlobalSettings(): void {

    this.globalSettings = this.dataBindingService.globalSettings.subscribe( ( settings: GlobalSettings ) => {

      this.language = settings[ 'settingDto' ][ 'language' ];

    });

  }

  private subscribeMe(): void {

      this.meSubscription = this.dataBindingService.me.subscribe( ( me: Object ) => {
          this.me = me;
      });

  }

  private subscribeMenuVisibility() {

    this.menu = this.dataBindingService.menuVisible.subscribe( ( visibleState: boolean ) => {

      this.menuVisible = visibleState;

    });

  }

  private subscribeRouter(): void {

    this.routerSubscription = this.router.events.subscribe( event => {

      if ( event instanceof NavigationEnd ) {

        this.updateMenuState( event.url.substr( 1 ).split( '/' )[ 0 ] );

      }

      if ( event instanceof NavigationStart ) {

        this.updateMenuState( event.url.substr( 1 ).split( '/' )[ 0 ] );

      }

    });

  }

  private subscribeView(): void {

      this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {

          this.viewSize = size;

      } );

  }

  private unsubscribeAll(): void {

    if ( !this.view.closed ) {

      this.view.unsubscribe();

    }

    if ( !this.menu.closed ) {

      this.menu.unsubscribe();

    }

    if ( !this.meSubscription.closed ) {

      this.meSubscription.unsubscribe();

    }

    this.routerSubscription.unsubscribe();

    this.globalSettings.unsubscribe();

  }


  public clicked( elemIndex ): void {

      this.menuArray[ elemIndex ] = !this.menuArray[ elemIndex ];

      if ( this.viewSize ) {

        setTimeout( () => {

          this.directiveScroll.update();

        }, 250);

      }

  }

  public getName(): string {

      return `${ this.me[ 'firstName' ] } ${ this.me[ 'lastName' ] }`;

  }

  public showHideMenu(): void {

      this.menuVisible = !this.menuVisible;

      this.dataBindingService.menuVisible.next( this.menuVisible );
  }

  public ngOnDestroy(): void {

    this.unsubscribeAll();

  }

}
