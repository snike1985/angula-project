import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class OverlayService {

  public htmlTag = document.getElementsByTagName('HTML')[0];

  public activePopup$: BehaviorSubject<any> = new BehaviorSubject( null );

  public activeDropDown$: BehaviorSubject<any> = new BehaviorSubject(null);

  public selectedOption$: BehaviorSubject<any> = new BehaviorSubject(null);

  public dropDownOpen: BehaviorSubject<any> = new BehaviorSubject(false);

  public onFocusSearchField: BehaviorSubject<any> = new BehaviorSubject(false);

  public openedMobileFiltersWrap: BehaviorSubject<any> = new BehaviorSubject(false);

  public addPopup( popup ) {
    this.activePopup$.next( popup );
  }

  public addDropDown( dropDown ) {
    this.activeDropDown$.next( dropDown );
  }

  public selectOption( key ) {
    this.selectedOption$.next(key);
  }

  public closeDropDown() {
    this.activeDropDown$.next( false );
    this.selectedOption$.next(false);
    this.dropDownOpen.next(false);
  }

  public closePopup() {
    this.activePopup$.next( false );
  }

  public setOverflowOverlay( state: boolean ) {

   if ( state || this.openedMobileFiltersWrap.value ) {

     this.htmlTag['style'].overflow = 'hidden';

   } else {

     this.htmlTag['style'].overflow = '';

   }

  }

}
