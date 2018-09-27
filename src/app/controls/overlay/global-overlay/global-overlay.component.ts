import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { OverlayService } from '../../../services/overlay.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'global-overlay',
  templateUrl: './global-overlay.component.html',
  styleUrls: ['./global-overlay.component.scss']
})
export class GlobalOverlayComponent implements OnInit, OnDestroy {

  public options: object[];

  public selected: object;

  public label: string = '';

  public subscriptionActiveDropDown: Subscription;

  public subscriptionSelectedOption: Subscription;

  @HostListener('document:click', ['$event'])

  clickout(event) {

    if ( this.options ) {

      if ( !this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0].contains(event.target) ) {
        this.closeDropDown();
      }
    }

  }

  constructor (
      public _overlayService: OverlayService,
      public _render: Renderer2,
      public _elemRef: ElementRef ) {}

  ngOnInit() {

  this.subscribeOnActiveropdown();

  this.subscribeOnSelectOptions();

  this.extendOnInit();

  }

  public extendOnInit() {}

  public subscribeOnSelectOptions() {

    this.subscriptionSelectedOption = this._overlayService.selectedOption$

        .subscribe(
            ( selected ) => {

              this.selected = selected;

              this.setDropDownPosition();

              this.label = selected['label'];

            }
        );
  }

  public subscribeOnActiveropdown() {
    this.subscriptionActiveDropDown =  this._overlayService.activeDropDown$

        .subscribe(
            ( result ) => {

              this.options = result.data;

              if ( result === false ) {

                this.setToNullOpenedPopup();
              }

            }
        );
  }

  public closeDropDown() {

    this.setToNullOpenedPopup();

    this._overlayService.closeDropDown();

  }

  public setDropDownPosition() {
    let dropDownWrap = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0],

        positions = this.selected['positions'];

    this.renderElement( dropDownWrap, positions );

    let label = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown__line')[0];

    if (label) {

      this.setLabelWidth(label, positions['l_width']);
    }

  }

  public setToNullOpenedPopup() {

    let dropDownWrap = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0],

        positions = this.selected['positions'];

    if (dropDownWrap) {
      this._render.setStyle(dropDownWrap, 'height', '0px');

    }

  }

  public setLabelWidth( label, width ) {

    this._render.setStyle(label, 'width', width);

  }

  public renderElement( dropDownWrap, positions ) {

    this._render.setStyle(dropDownWrap, 'width', positions['width']);

    this._render.setStyle(dropDownWrap, 'left', positions['left']);

    let widthBounding;

    if (widthBounding = this.checkIfOverlayNeedPositioning()) {

      this._render.setStyle(dropDownWrap, 'right', (window.innerWidth - positions['right']) + 'px');

      this._render.setStyle(dropDownWrap, 'left', 'auto');

    }

    this._render.setStyle(dropDownWrap, 'top', positions['top']);



    this._render.setStyle(dropDownWrap, 'height', positions['height']);


    this._render.setStyle(dropDownWrap, 'max-height', positions['maxHeight']);

  }

  protected checkIfOverlayNeedPositioning(): any {

    let overlay = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0];

    if (overlay) {

      overlay = overlay.getBoundingClientRect();

          if ( window.innerWidth - overlay.left < (overlay.width + 10)) {
            return overlay.width + overlay.left;
          } else {
            return false;
          }

    }

  }

  ngOnDestroy () {

    this.unSubscribeAll();

    this.extendsOnDestroy();

  }

  public unSubscribeAll() {

    this.subscriptionSelectedOption.unsubscribe();

    this.subscriptionActiveDropDown.unsubscribe();

  }

  public extendsOnDestroy() {

  }

}
