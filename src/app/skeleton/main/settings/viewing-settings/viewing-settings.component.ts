import {
  Component,
  ElementRef,
  HostBinding,
  OnDestroy,
  Renderer2
}                      from '@angular/core';
import {
  FormControl,
  FormGroup
}                      from '@angular/forms';
import { Subscription }            from 'rxjs/Subscription';

import { ContentCommonComponent }   from '../../../content-common/content-common.component';

import { DataBindingService }       from '../../../../services/data.binding.service';
import { ViewingSettingsService }   from '../../../../services/main/settings/viewing-settings.service';

import {
  FadeInOut,
  VisibilityChanged
}               from '../../../../config/animations.config';
import { ViewingSettingsConfig }    from '../../../../config/viewing-settings.config';
import { NotificationService }      from '../../../../services/notification.service';
import { GlobalSettings } from '../../../../interfaces/global-settings';

@Component( {
  selector: 'viewing-settings',
  templateUrl: './viewing-settings.component.html',
  styleUrls: [ './viewing-settings.component.scss' ],
  animations: [ FadeInOut, VisibilityChanged ]
} )
export class ViewingSettingsComponent extends ContentCommonComponent implements OnDestroy {

  private fgSubscription: Subscription;
  private viewingSettingsConfig = ViewingSettingsConfig;
  private pagination: string;
  private search: string;
  private searchOptions: Object[];


  public language: string;
  public texts: Object;
  public languages: Object[] = [];
  public pages: Object[] = [];
  public fg: FormGroup;
  public searchData: {};
  public hasChanges: boolean = false;

  constructor( protected dataBindingService: DataBindingService,
               private viewingSettingsService: ViewingSettingsService,
               private notification: NotificationService,
               public  elemHref: ElementRef,
               public renderer: Renderer2 ) {

    super( dataBindingService, elemHref, renderer );

    this.setText();
    this.getOptions();
    this.createFormGroup();
    this.subscribeFormGroupChanges();

    this.hideSpinner();

  }

  private checkChanges( data: Object ): void {

    this.hasChanges = false;

    for ( let key in data ) {

      if ( data[ key ] !== this.globalSettings[ 'settingDto' ][ key ] ) {

        this.hasChanges = true;

        break;

      }

    }

  }

  private createFormGroup(): void {

    this.fg = new FormGroup( {
      language: new FormControl( this.language ),
      pagination: new FormControl( this.pagination ),
      search: new FormControl( this.search )
    } );

  }

  private getOptions(): void {

    this.languages = this.dataToOptions( this.globalSettings[ 'language' ] );
    this.pages = this.dataToOptions( this.globalSettings[ 'pagination' ] );
    this.searchOptions = this.dataToOptions( this.globalSettings[ 'searchOption' ] );

    this.pagination = this.globalSettings[ 'settingDto' ][ 'pagination' ];
    this.search = this.globalSettings[ 'settingDto' ][ 'search' ];

    this.searchData = {
      items: this.searchOptions,
      name: 'search'
    };

  }

  private dataToOptions( data: string[] ): Object[] {

    let result = [];

    data.map( ( item: string ) => {

      result.push( {
        value: item,
        text: item
      } );

    } );

    return result;

  }

  private setText(): void {

    this.texts = this.viewingSettingsConfig[ 'texts' ][ this.language ];

  }

  private subscribeFormGroupChanges(): void {

    this.fgSubscription = this.fg.valueChanges.subscribe( ( data: Object ) => {

      this.checkChanges( data );

    } );

  }


  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
    this.fgSubscription.unsubscribe();

  }


  public reset( event ): void {

    event.preventDefault();

    for ( let controlName in this.fg.controls ) {

      this.fg.controls[ controlName ].setValue( this.globalSettings[ 'settingDto' ][ controlName ] );

    }

  }

  public submit( { value } ): void {

    let data: GlobalSettings = JSON.parse( JSON.stringify( this.globalSettings ) ),
      id = `${ data[ 'settingDto' ][ 'id' ] }`;

    for ( let item in value ) {
      data[ 'settingDto' ][ item ] = value[ item ];
    }

    this.viewingSettingsService.send( 'update', data, id ).subscribe(
      res => {

        let dataJson = res.json();

        if ( dataJson[ 'status' ] === 'failure' ) {

          this.notification.errorNotify( `${dataJson[ 'message' ]}` );

        } else {

          this.dataBindingService.globalSettings.next( data );

          this.notification.successNotify( `${dataJson[ 'message' ]}` );

        }

      },
      ( error: Object ) => {

        this.notification.errorNotify( 'Profile wasn’t changed' );

      } );

  }

}
