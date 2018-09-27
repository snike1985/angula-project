import { Injectable }               from '@angular/core';
import { BehaviorSubject }          from 'rxjs/BehaviorSubject';

import { GlobalSettings }           from '../interfaces/global-settings';
import { Subject } from 'rxjs/Subject';

@Injectable()

export class DataBindingService {

  get globalSettings(): BehaviorSubject<GlobalSettings> {
    return this._globalSettings;
  }

  set globalSettings( value: BehaviorSubject<GlobalSettings> ) {
    this._globalSettings = value;
  }

  private _globalSettings: BehaviorSubject<GlobalSettings> = new BehaviorSubject( null );


  public token: BehaviorSubject<string> = new BehaviorSubject( null );
  public passwordToken: BehaviorSubject<string> = new BehaviorSubject( null );
  public preloaderVisible: BehaviorSubject<boolean> = new BehaviorSubject( true );
  public mainSpinnerVisible: BehaviorSubject<boolean> = new BehaviorSubject( true );
  public me: BehaviorSubject<Object> = new BehaviorSubject( {} );
  public currentData: BehaviorSubject<Object> = new BehaviorSubject( null );
  public viewSize: BehaviorSubject<number> = new BehaviorSubject( 0 );
  public menuVisible: BehaviorSubject<boolean> = new BehaviorSubject( false );
  public contentScrollTop: BehaviorSubject<number> = new BehaviorSubject( null );
  public userRoles: BehaviorSubject<Object[]> = new BehaviorSubject( null );
  public search: BehaviorSubject<string> = new BehaviorSubject( '' );
  public confirm: Subject<boolean> = new Subject();

}

