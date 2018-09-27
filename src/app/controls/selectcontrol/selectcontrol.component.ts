import {
  Component,
  ElementRef,
  forwardRef,
  Input,
  OnDestroy
} from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';
import { DropDown } from '../../interfaces/dropdown';
import { OverlayService } from '../../services/overlay.service';
import { SimpleDropdownComponent } from '../overlay/simpledropdown/simpledropdown.component';
import { DataBindingService } from '../../services/data.binding.service';
import { SimpleSearchDropdownComponent } from '../overlay/simple-search-dropdown/simple-search-dropdown.component';
import { ComboDropdownComponent } from '../overlay/combodropdown/combodropdown.component';
import { ComboMerchantOptionsComponent } from '../overlay/combomerchantoptions/combomerchantoptions.component';
import { AmountDropdownComponent } from '../overlay/amountdropdown/amountdropdown.component';
import { AmounControlConfig } from '../../config/amount.config';

@Component( {
  selector: 'select-control',
  templateUrl: './selectcontrol.component.html',
  styleUrls: [ './selectcontrol.component.scss' ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => SelectControlComponent ),
      multi: true
    }
  ]
} )

export class SelectControlComponent implements OnDestroy, ControlValueAccessor {

  private overlays: object = {
    0: SimpleDropdownComponent,
    1: SimpleSearchDropdownComponent,
    2: ComboDropdownComponent,
    3: ComboMerchantOptionsComponent,
    4: AmountDropdownComponent
  };

  @Input( 'value' ) private _value;
  @Input() private overlayType: number = 0;

  @Input() public label: string = '';
  @Input() public options: any;
  @Input() public lang: any;
  @Input() public type: number;
  @Input() public className: string;
  public controlName: string;

  public activeSelectName: string;
  public selectedSomeValue: boolean;
  public isOpen: boolean;
  public selectedValue: string = '';
  public subscriptionSelectedOption: Subscription;
  public subscriptionViewSize: Subscription;
  public contentScrollTopSubscription: Subscription;
  public subscriptionActiveDropDown: Subscription;
  public dropDown: any;
  public contentScrollTop: any;
  public viewSize: number;

  constructor( protected _overlayService: OverlayService,
    protected _dataBindingService: DataBindingService,
    protected _elemRef: ElementRef ) {

    this.setUniqueControlName();

    this._overlayService.dropDownOpen.subscribe(
      ( isOpen ) => {

        this.isOpen = isOpen;

      }
    );

    this.subscriptionViewSize = this._dataBindingService.viewSize.subscribe(
      ( viewSize ) => {
        this.viewSize = viewSize;

        if ( !this.checkSearchFieldOnFocus() ) {

          _overlayService.closeDropDown();

        }

      }
    );

    this.contentScrollTopSubscription = _dataBindingService.contentScrollTop.subscribe(
      ( contentScrollTop ) => {

        this.contentScrollTop = contentScrollTop;

        this._overlayService.closeDropDown();

      }
    );

    this.subscriptionActiveDropDown = _overlayService.activeDropDown$.subscribe(
      ( dropDown ) => {

        if ( !dropDown ) {

          this.activeSelectName = '';

        }

        this.dropDown = dropDown;

      }
    );


    this.subscriptionSelectedOption = this._overlayService.selectedOption$.subscribe(
      ( value ) => {

        if ( value && value[ 'select' ] === this.controlName ) {

          if ( this.value !== value[ 'key' ] ) {
            this.value = value[ 'key' ];
          }

          this.activeSelectName = value[ 'select' ];

          this.checkSelectedNameFormat( value[ 'key' ] );

        } else {
          this.activeSelectName = '';
        }

        this.setClassIfSomeSelected();
      }
    );

  }

  public setClassIfSomeSelected() {
    if (this.value !== '-1') {
      this.selectedSomeValue = true;
    } else {
      this.selectedSomeValue = false;
    }
  }

  public openDropDown( event ) {

    this._overlayService.dropDownOpen.next( true );

    if ( this.isOpen && this.activeSelectName === this.controlName ) {

      this._overlayService.closeDropDown();

      this._overlayService.dropDownOpen.next( false );

    } else {

      event.stopPropagation();

      this._overlayService.selectOption( this.getOptionsObject() );

      let selected;

      if ( this.overlayType === 2 ) {
        selected = null;
      } else {
        selected = 25;
      }

      this._overlayService.addDropDown(
        new DropDown( this.overlays[ this.overlayType ], this.options, selected )
      );

    }

  }

  private _onChange = ( _: any ) => {};

  private _onTouched = () => { };

  public writeValue( val: any ) {

    this._value = val;

    this.setClassIfSomeSelected();

    this.checkSelectedNameFormat( val );

    if ( this.isOpen ) {
      this._overlayService.selectOption( this.getOptionsObject() );
    }

  }

  get value(): any {
    return this._value;
  }

  set value( val ) {
    this._value = val;
    this._onChange( val );
  }

  public registerOnChange( fn: ( _: any ) => void ): void { this._onChange = fn; }

  public registerOnTouched( fn: () => void ): void { this._onTouched = fn; }

  public setDisabledState( isDisabled: boolean ): void {}

  public calculateDropDownPositions(): Object {

    let labelWidth = this.getLabelWidth();

    let elementPosition = this._elemRef.nativeElement.getElementsByClassName( 'select-control' )[ 0 ].getBoundingClientRect(),
      topPosition,
      leftPosition,
      width,
      height,
      maxHeight,
      rightPosition;

    if ( this.viewSize === 3 ) {
      topPosition = elementPosition.top + elementPosition.height + 10 + 'px';
      leftPosition = elementPosition.left + 'px';
      width = elementPosition.width + 'px';

      maxHeight = ( window.innerHeight - ( elementPosition.top + elementPosition.height + 10 ) ) + 'px';

      height = 'auto';

    } else {
      topPosition = '0';
      leftPosition = '0';
      width = '100%';
      height = '100vh';
      maxHeight = '100vh';
    }

    if ( this.overlayType === 3 ) {

      if ( window.innerWidth - elementPosition.left <= 620 ) {
        rightPosition = (window.innerWidth - elementPosition.right) + 'px';
        leftPosition = 'auto';
      }

    }

    if (this.overlayType === 4) {

        rightPosition =  elementPosition.right;

    }

    labelWidth = labelWidth + 'px';

    return {
      'top': topPosition,
      'left': leftPosition,
      'width': width,
      'height': height,
      'l_width': labelWidth,
      'maxHeight': maxHeight,
      'right': rightPosition
    };

  }

  public getOptionsObject(): Object {

    return {
      'key': this._value,
      'select': this.controlName,
      'positions': this.calculateDropDownPositions(),
      'label': this.label,
      'dropDownClass': this.className
    };

  }

  public setOptionTextByValue( value: string ): void {

    let self = this;

    if ( !this.options ) {
      return;
    }

    this.options.map( function( objectKey ) {

      if ( objectKey[ 'value' ].toString() === value.toString() ) {

        self.selectedValue = objectKey[ 'text' ].toString();

      }

    } );

  }

  public ngOnDestroy(): void {

    this.subscriptionSelectedOption.unsubscribe();

    this.subscriptionViewSize.unsubscribe();

    this.contentScrollTopSubscription.unsubscribe();

    this.subscriptionActiveDropDown.unsubscribe();

  }

  public getLabelWidth() {

    let label = this._elemRef.nativeElement.getElementsByClassName( 'select-control-label' )[ 0 ];

    if ( label ) {
      return label.getBoundingClientRect()[ 'width' ];
    }


    return null;

  }

  public checkSearchFieldOnFocus() {

    return this.viewSize === 0 && this._overlayService.onFocusSearchField;

  }

  public setNameForMultiSelect( value: string ): void {

    let items = value.split( ',' ),
      itemsCount = items.length;

    if ( itemsCount ) {

      if ( itemsCount > 1 ) {

        this.selectedValue = itemsCount + ' items selected';

      } else {

        this.checkOptionTextByValueMultiSelect( items[ 0 ] );

      }

    }

  }

  public checkSelectedNameFormat(value: any): void {

    switch ( this.overlayType ) {

      case 2 : {
        this.setNameForMultiSelect( value );
        break;
      }
      case 3 : {
        this.setNameForMultiSelect( value );
        break;
      }
      default: {
        this.setOptionTextByValue( value );
        break;
      }

    }

  }

  public setNameForAmount(value): void {}


  public checkOptionTextByValueMultiSelect( item ) {

    switch ( this.overlayType ) {

      case 2 : {
        this.setOptionTextByValueComboDropdown( item );
        break;
      }
      case 3 : {
        this.setOptionTextByValueMultiSelect( item );
        break;
      }

    }

  }

  public setOptionTextByValueMultiSelect(value: string): void {

    if (!this.options) {
      return;
    }

    let self = this,
      isNameSet: boolean = false;

    this.options.map( function( objectKey ) {

      objectKey[ 'options' ].map( function( option ) {

        if ( option[ 'value' ].toString() === value.toString() ) {

          self.selectedValue = option[ 'text' ];

          isNameSet = true;

        }

        if ( option[ 'value' ] === -1 ) {

        }

      } );

    } );

    if ( !isNameSet ) {
      this.selectedValue = this.options[ 0 ][ 'options' ][ 0 ][ 'text' ];
    }

  }

  public setOptionTextByValueComboDropdown( value: string ): void {

    let self = this,
      isNameSet: boolean = false;

    this.options.map( function( option ) {

      if ( option[ 'value' ] === Number( value ) ) {

        self.selectedValue = option[ 'text' ];

        isNameSet = true;

      }

    } );

    if ( !isNameSet ) {
      this.selectedValue = this.options[ 0 ][ 'text' ];
    }

  }

  public setUniqueControlName(): void {

    this.controlName = this.randomString();

  }

  public randomString() {
    let length = 123;
    let result = '',
      chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    for ( let i = length; i > 0; --i ) {
      result += chars[ Math.floor( Math.random() * chars.length ) ];
    }
    return result;
  }

}
