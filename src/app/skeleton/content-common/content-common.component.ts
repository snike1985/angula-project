import {
  AfterViewInit,
  ElementRef,
  OnDestroy,
  Renderer2,
  ViewChild
}                                from '@angular/core';
import { Subscription }          from 'rxjs/Subscription';

import { MainSpinnerComponent }  from '../spinner/spinner.component';

import { DataBindingService }    from '../../services/data.binding.service';
import { GlobalSettings }        from '../../interfaces/global-settings';


export class ContentCommonComponent extends MainSpinnerComponent implements OnDestroy, AfterViewInit {

  @ViewChild( 'mainscroll' ) protected mainScroll;

  private mainSpinner: Subscription;

  protected view: Subscription;
  protected globalSettingsSubscription: Subscription;
  protected scrollSubscription: Subscription;

  public globalSettings: Object;
  public isVisible: boolean;
  public language: string;
  public viewSize: any;


  constructor( protected dataBindingService: DataBindingService,
               protected elemHref: ElementRef,
               protected renderer: Renderer2 ) {

    super( dataBindingService );

    this.subscribeGlobalSettings();

    this.subscribeSpinnerVisibility();

    this.subscribeView();

  }


  private subscribeGlobalSettings(): void {

    this.globalSettingsSubscription = this.dataBindingService.globalSettings.subscribe( ( settings: GlobalSettings ) => {

      this.globalSettings = settings;

      this.language = this.globalSettings[ 'settingDto' ][ 'language' ];

    } );

  }

  private subscribeSpinnerVisibility() {

    this.mainSpinner = this.dataBindingService.mainSpinnerVisible.subscribe( ( visibleState: boolean ) => {

      this.isVisible = visibleState;

    } );

  }


  protected addScrollListner(): void {

    if ( this.mainScroll ) {

      this.renderer.listen( this.mainScroll.nativeElement, 'scroll', ( evt ) => {

        this.dataBindingService.contentScrollTop.next( evt.target.scrollTop );

      } );

    }


  }

  protected clearAllItems(): void {}

  protected subscribeView(): void {

    this.view = this.dataBindingService.viewSize.subscribe( ( size: number ) => {
      this.viewSize = size;
    } );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    if ( this.scrollSubscription ) {

      this.scrollSubscription.unsubscribe();

    }

    this.view.unsubscribe();

  }


  public ngOnDestroy(): void {

    this.clearAllItems();

    this.unsubscribeAll();

  }

  public ngAfterViewInit(): void {

    this.addScrollListner();

  }

}
