import {
  Component,
  forwardRef,
  Input,
  OnDestroy
}    from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
}  from '@angular/forms';
import { Subscription }                             from 'rxjs/Subscription';

import { DataBindingService }                       from '../../services/data.binding.service';

import { VisibilityChanged }                        from '../../config/animations.config';
import { SwitchControlConfig }                      from '../../config/switch-control.config';

import { GlobalSettings }                           from '../../interfaces/global-settings';

@Component( {
  selector: 'switch-control',
  templateUrl: './switch-control.component.html',
  styleUrls: [ './switch-control.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SwitchControlComponent ),
      multi: true
    }
  ],
  animations: [ VisibilityChanged ]
} )
export class SwitchControlComponent implements ControlValueAccessor, OnDestroy {

  @Input( 'value' ) _value = false;
  @Input() disabledState: boolean;
  @Input() niceCheckbox: boolean;
  @Input() withoutLabel: boolean;
  @Input() label: any;
  @Input() className: string;

  protected globalSettingsSubscription: Subscription;


  public active: boolean = false;
  public texts: Object;
  public switcherConfig: Object = SwitchControlConfig;
  public language: string;


  constructor( protected dataBindingService: DataBindingService ) {

    this.subscribeGlobalSettings();

  }

  private setText(): void {

    this.texts = this.switcherConfig[ 'texts' ][ this.language ];

  }

  private subscribeGlobalSettings(): void {

    this.globalSettingsSubscription = this.dataBindingService.globalSettings.subscribe( ( settings: GlobalSettings ) => {

      this.language = settings[ 'settingDto' ][ 'language' ];

    } );

    this.setText();

  }

  public get value() {

    return this._value;
  }

  public set value( val ) {

    this._value = val;

    if ( this._value !== undefined ) {

      this.propagateChange( this.value );

      if ( this._value ) {

        this.active = this._value;

      }

    }

  }

  private propagateChange: any = () => {
  }

  private propagateTouch: any = () => {
  }

  private unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();
  }


  public doChange( event ) {

    event.stopPropagation();

    this.value = !this.value;

    this.propagateTouch();

  }

  public ngOnDestroy() {

    this.unsubscribeAll();

  }

  public registerOnChange( fn ) {

    this.propagateChange = fn;

  }

  public registerOnTouched( fn ) {

    this.propagateTouch = fn;

  }

  public setDisabledState( disabledState: boolean ) {
  }

  public writeValue( value: any ) {

    if ( value !== undefined ) {

      this.value = value;

    }

  }

}
