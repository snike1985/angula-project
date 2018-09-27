import {
  Component,
  ElementRef,
  Renderer2
} from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { Location } from '@angular/common';

import { CreateEditComponent } from '../../../create-edit/create-edit.component';

import { InstitutionsCreateConfig } from '../../../../config/institutions.config';

import { SelectOptions } from '../../../../interfaces/select-options';

import { DataBindingService } from '../../../../services/data.binding.service';
import { NotificationService } from '../../../../services/notification.service';
import { OverlayService } from '../../../../services/overlay.service';

export class InstitutionCommonCreateComponent extends CreateEditComponent {

  private activateOnSubscription: Subscription;
  private expiryOnSubscription: Subscription;

  protected fgSubscription: Subscription;
  protected pathAfterRemove: string[];

  public config: object = InstitutionsCreateConfig;
  public currentItem: Object;
  public activeTab: string = 'general';
  public countriesOptions: SelectOptions[];
  public statesOptions: SelectOptions[];
  public fg: FormGroup;
  public generalErrorsCount: number = 0;
  public contactErrorsCount: number = 0;
  public optionErrorsCount: number = 0;
  public activateOnControl: FormControl;
  public expiryOnControl: FormControl;


  constructor( protected dataBindingService: DataBindingService,
    protected elemHref: ElementRef,
    protected itemsService: any,
    protected renderer: Renderer2,
    protected notification: NotificationService,
    protected router: Router,
    protected overlayService: OverlayService ,
    protected location: Location) {

    super( dataBindingService, elemHref, itemsService, renderer, notification, router, overlayService, location );

    this.config = InstitutionsCreateConfig;

  }


  protected checkGroupErrors( name: string ): number {

    let group = this.fg.controls[ name ];

    if ( group ) {

      let generalControls = group[ 'controls' ],
        errors = 0;

      for ( let key in generalControls ) {

        if ( !generalControls[ key ].valid ) {

          errors++;

        }

      }

      return errors;

    } else {

      return 0;

    }


  }

  protected createFormGroup(): void {}

  protected getChar( event ): string {

    if ( event.which == null ) {

      if ( event.keyCode < 32 ) {

        return null;

      }

      return String.fromCharCode( event.keyCode );

    }

    if ( event.which !== 0 && event.charCode !== 0 ) {

      if ( event.which < 32 ) {

        return null;

      }

      return String.fromCharCode( event.which );

    }

    return null;
  }

  protected dynamicEmailValidator( control: FormControl ): { [ key: string ]: boolean } {

    const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if ( reg.test( control.value ) || control.value === '' ) {

      return {};

    } else {

      return { email: true };

    }

  }

  protected setData( data: Object ): void {}

  protected showInvalidItems(): void {

    this.generalErrorsCount = this.checkGroupErrors( 'general' );
    this.contactErrorsCount = this.checkGroupErrors( 'institutionDetail' );

    for ( let groupKey in this.fg.controls ) {

      let group = this.fg.controls[ groupKey ];

      for ( let controlKey in group[ 'controls' ] ) {

        let control = group[ 'controls' ][ controlKey ];

        control.markAsTouched();

      }

    }

  }

  protected subscribeDateControls(): void {

    this.activateOnSubscription = this.activateOnControl.valueChanges.subscribe( ( data: number ) => {

      this.updateActivateOn( data );

    } );

    this.expiryOnSubscription = this.expiryOnControl.valueChanges.subscribe( ( data: number ) => {

      this.updateExpiryOn( data );

    } );

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    if ( this.scrollSubscription ) {

      this.scrollSubscription.unsubscribe();

    }

    this.view.unsubscribe();

    if ( this.tableDataSubscription ) {

      this.tableDataSubscription.unsubscribe();

    }

    this.unSubscribeConfirm();
    this.unSubscribeFg();

  }

  protected unSubscribeFg(): void {

    if ( this.fgSubscription && !this.fgSubscription.closed ) {

      this.fgSubscription.unsubscribe();

    }

  }

  protected updateActivateOn( activateOn: number ): void {

    let expiryOn = this.expiryOnControl.value;

    if ( activateOn > expiryOn ) {

      this.expiryOnControl.setValue( activateOn );

    }

  }

  protected updateExpiryOn( expiryOn: number ): void {

    let activateOn = this.activateOnControl.value;

    if ( ( activateOn > expiryOn ) || !activateOn ) {

      this.activateOnControl.setValue( expiryOn );

    }


  }


  protected create( value ): void {

    console.log( 100 );

    this.loading = true;

    this.setData( value );

    this.itemsService.send( 'insert', this.currentItem )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'failure' ) {

            this.notification.errorNotify( `${ data[ 'message' ] }` );

          } else {

            let path = this.pathAfterRemove.concat( [
              data[ 'data' ][ 'id' ],
              'edit'
            ] );


            this.router.navigate( path );
            this.notification.successNotify( `${ data[ 'message' ] }` );

          }

          this.loading = false;

        } );

  }

  // .main-field[_ngcontent-c17]   input.ng-touched.ng-invalid[_ngcontent-c17]    +
  // .main-field__invalid[_ngcontent-c17], .main-field[_ngcontent-c17]   textarea.ng-touched.ng-invalid[_ngcontent-c17]
  //    + .main-field__invalid[_ngcontent-c17]
  protected edit( value ): void {

    this.loading = true;

    this.setData( value );

    this.itemsService.send( 'update', this.currentItem, this.currentItem[ 'id' ] )
        .subscribe( res => {

          let data = res.json();

          if ( data[ 'status' ] === 'failure' ) {

            this.notification.errorNotify( `${ data[ 'message' ] }` );

          } else {

            this.notification.successNotify( `${ data[ 'message' ] }` );

          }

          this.loading = false;

        } );

  }

  public phoneOnly( e ): boolean {
    e = e || event;

    if ( e.ctrlKey || e.altKey || e.metaKey ) {
      return;
    }

    let chr = this.getChar( e );

    if ( chr === null ) {

      return;

    }

    if ( ( chr < '0' || chr > '9' ) && ( chr !== '+' || e.target.value.length > 0 ) ) {

      return false;

    }

  }

}
