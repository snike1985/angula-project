import {
  AfterViewInit,
  Component,
  ComponentFactoryResolver,
  HostListener, OnDestroy,
  ViewChild
}                from '@angular/core';
import { Subscription }      from 'rxjs/Subscription';

import { PopupDirective }    from '../../directives/popup.directive';
import { DropdownDirective } from '../../directives/dropdown.directive';


import { OverlayService }    from '../../services/overlay.service';

import { DropDown }          from '../../interfaces/dropdown';

import { PopupScale }        from '../../config/animations.config';
import { PopupsConfig }      from '../../config/overlay.config';
import { DataBindingService } from '../../services/data.binding.service';

@Component({
  selector: 'overlay',
  templateUrl: './overlay.component.html',
  styleUrls: ['./overlay.component.scss'],
  animations: [PopupScale]
})
export class OverlayComponent implements AfterViewInit, OnDestroy {

  public componentRef: any;

  public viewContainerRefDropDown: any;

  public viewContainerRefPopup: any;

  public isOpenDropDown: boolean = false;

  public isOpenPopup: boolean = false;

  public state: string = 'inactive';

  public subscriptionViewSize: Subscription;

  public viewSize: number;

  @ViewChild( PopupDirective ) popupDirective: PopupDirective;

  @ViewChild( DropdownDirective ) dropDownDirective: DropdownDirective;

  @HostListener('document:click', ['$event'])

  public onClick($event) {}

  public subscriptionActiveDropDown: Subscription;

  public subscriptionActivePopup: Subscription;

  constructor(
      private _componentFactoryResolver: ComponentFactoryResolver,
      private overlayService: OverlayService,
      private dataBindingService: DataBindingService
  ) {}

  public ngAfterViewInit(): void {

    this.subscribeOnViewSize();

    this.subscriptionActivePopup = this.overlayService.activePopup$.subscribe(

        (popup) => {

          this.checkOverlay(popup);

          if ( popup === false ) {

            this.closePopup();

          } else if (popup) {

            this.loadComponent( popup, this.popupDirective );

          }

        }
    );

    this.subscriptionActiveDropDown = this.overlayService.activeDropDown$.subscribe(

        ( dropdown ) => {

          this.checkOverlay(dropdown);

          if ( dropdown === false ) {

            this.isOpenDropDown = false;

            this.closeDropDown();

          } else {

            this.isOpenDropDown = true;

            this.loadDropDown( dropdown, this.dropDownDirective);

          }

        }

    );

  }

  public loadComponent( popup: any, directive: any ): void {

      let popupComponent = PopupsConfig[ popup ];

      this.closeOpenedPopup();

      this.triggerState();

      this.isOpenPopup = true;

      let componentFactory = this._componentFactoryResolver.resolveComponentFactory(popupComponent);

      this.viewContainerRefPopup = directive.viewContainerRef;

      this.componentRef = this.viewContainerRefPopup.createComponent(componentFactory);

  }

  public loadDropDown( dropDown: DropDown, directive: any ): void {

    if ( dropDown !== null ) {

      let componentFactory = this._componentFactoryResolver.resolveComponentFactory( dropDown.component );

      this.viewContainerRefDropDown = directive.viewContainerRef;

      this.closeDropDown();

      this.componentRef = this.viewContainerRefDropDown.createComponent(componentFactory);

      this.componentRef.instance.data = dropDown.data;

    }

  }

  public closePopup(): void {

    this.viewContainerRefPopup.clear();

    this.overlayService.activePopup$.next( null );

    this.isOpenPopup = false;

    this.state = 'inactive';

  }

  public closeDropDown(): void {

    if ( this.viewContainerRefDropDown ) {

      this.viewContainerRefDropDown.clear();

      this.overlayService.dropDownOpen.next(false);

    }

  }

  public closeOpenedPopup(): void {

    if ( this.viewContainerRefPopup  ) {

      this.closePopup();

      this.isOpenPopup = false;

    }

  }

  public triggerState(): void {

    if ( this.state === 'inactive') {

      this.state = 'active';

    } else {

      this.state = 'inactive';

    }

  }

  public closePopupOverLay(e): void {

    e.stopPropagation();

  }

  public checkOverlay (overlay) {

    if ( this.viewSize === 3 ) {
      return;
    }

    if ( overlay ) {
      this.overlayService.setOverflowOverlay(true);
    } else {
      this.overlayService.setOverflowOverlay(false);
    }
  }

  private subscribeOnViewSize() {

    this.subscriptionViewSize =  this.dataBindingService.viewSize.subscribe(

        (viewSize) => {
          this.viewSize = viewSize;
        }

    );
  }

  private unSubscribeViewSize() {
    this.subscriptionViewSize.unsubscribe();
  }

  ngOnDestroy() {

    this.subscriptionActiveDropDown.unsubscribe();

    this.subscriptionActivePopup.unsubscribe();

    this.unSubscribeViewSize();

  }

}
