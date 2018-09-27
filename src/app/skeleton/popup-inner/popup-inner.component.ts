import {
  AfterViewChecked,
  HostListener,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { Subscription }        from 'rxjs/Subscription';

import { DataBindingService }  from '../../services/data.binding.service';
import { OverlayService }      from '../../services/overlay.service';

import { GlobalSettings }      from '../../interfaces/global-settings';


export class PopupInnerComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild( 'popup' ) protected popupContainer;

  @HostListener( 'window:resize' ) onWindowResize() {

    this.maxHeight = window.innerHeight - 60 - this.headerH;

  }

  private globalSettings: Object;

  protected headerH: number = 81;
  protected globalSettingsSubscription: Subscription;
  protected config: any;

  public language: string;
  public texts: Object;
  public maxHeight: number = 10000;

  constructor(
    protected dataBindingService: DataBindingService,
    protected overlayService: OverlayService ) {

    this.subscribeGlobalSettings();

  }


  protected subscribeGlobalSettings(): void {

    this.globalSettingsSubscription = this.dataBindingService.globalSettings.subscribe( ( settings: GlobalSettings ) => {

      this.globalSettings = settings;
      this.language = this.globalSettings['settingDto']['language'];

    });

  }

  protected unSubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

  }


  public ngAfterViewChecked(): void {



  }

  public close(): void {

    this.overlayService.closePopup();

  }

  public ngOnDestroy(): void {

    this.unSubscribeAll();

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.maxHeight = window.innerHeight - 60 - this.headerH;


  }

}
