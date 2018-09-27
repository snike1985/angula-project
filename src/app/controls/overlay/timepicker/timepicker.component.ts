import {
  Component,
  ElementRef, forwardRef, HostListener, Input, OnDestroy,
  OnInit
}                from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR
}                                 from '@angular/forms';

@Component({
  selector: 'timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimepickerComponent),
      multi: true
    }
  ]
})

export class TimepickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public activeIndex: number = 3;
  public ranges: number[];
  public fg: FormGroup;

  @Input('value') private _value;

  constructor( private elemRef: ElementRef ) {}

  @HostListener('window:click', ['$event'])
  private onClick(event: any ): void {
    // if ( event.target.tagName !== 'INPUT' && event.target.className !== 'timepicker__controls' ) {
    //   this.setActiveIndex(3);
    // }
  };

  @HostListener('document:keydown', ['$event'])
  tabNavigationHandler (event: any) {

    this.tabNavigation(event);

    this.upAndDownButtons(event);

    this.changeFocusPosition(event);

  }

  ngOnInit() {}

  public setActiveIndex( i: number ) {

    this.activeIndex = i;

  }

  public mouseWheelUpFunc( event ) {

    if ( this.ranges[this.activeIndex] || this.ranges[this.activeIndex] === 0 ) {

      if ( event.deltaY < 0 ) {

        this.changeToUp();

      } else {

        this.changeToDown();

      }
    }
  }

  public changeToUp() {

    this.setActiveIndex(0);

    if ( this.activeIndex > 2 ) {
      return;
    }

    let circleFlag: boolean = false;

    if ( this.activeIndex === 0 ) {

        if ( this.ranges[this.activeIndex] >= 12 ) {

          this.ranges[this.activeIndex] = 1;

          circleFlag = true;

        }

    } else {

      if ( this.ranges[this.activeIndex] >= 59 ) {

        this.ranges[this.activeIndex] = 0;

        circleFlag = true;

      }

    }
        if ( !circleFlag ) {
          this.ranges[this.activeIndex]++;
        }

    this.setValueControl( this.ranges );

  }

  public changeToDown() {

    this.setActiveIndex(0);

    let circleFlag: boolean = false;

    if ( this.activeIndex === 0 ) {

      if ( this.ranges[this.activeIndex] <= 1 ) {

        this.ranges[this.activeIndex] = 12;

        circleFlag = true;

      }

    } else {

      if ( this.ranges[this.activeIndex] <= 0 ) {

        this.ranges[this.activeIndex] = 59;

        circleFlag = true;

      }

    }

    if ( !circleFlag ) {

      this.ranges[this.activeIndex]--;

    }

    this.setValueControl( this.ranges );

  }

  public formatTime( time: number ) {
    return (time < 10) ? ('0' + time) : time;
  }

  private tabNavigation(event: any) {
    // if ( event['keyCode'] === 9 || this.activeIndex < 3 ) {
    //   this.setActiveIndex( this.activeIndex + 1 );
    // } else if (this.activeIndex === 2) {
    //   this.setActiveIndex( 3 );
    // }
  }

  private createFormGroup() {
    this.fg = new FormGroup({
      hours:   new FormControl( this.formatTime( this.ranges[0] )),
      minutes: new FormControl( this.formatTime( this.ranges[1] )),
      seconds: new FormControl( this.formatTime( this.ranges[2] ))
    });
  }

  public getInputNameByIndex( i: number ) {

    if (i < 3) {
      switch (i) {
        case 0: {
          return 'hours';
        }
        case 1: {
          return 'minutes';
        }
        case 2: {
          return 'seconds';
        }
      }
    }

  }

  ngOnDestroy() {

  }

  private upAndDownButtons( event: Event ) {

    let keyCode = event['keyCode'];

    if ( this.ranges[this.activeIndex] || this.ranges[this.activeIndex] === 0 ) {

      if (keyCode === 38) {

        this.changeToUp();

      } else if (keyCode === 40) {

       this.changeToDown();

      }

    }

  }

  private changeFocusPosition(event) {

    let keyCode = event['keyCode'];

    if ( this.ranges[this.activeIndex] || this.ranges[this.activeIndex] === 0 ) {

      if (keyCode === 37) {

        if ( this.activeIndex === 1 || this.activeIndex === 2 ) {
          this.activeIndex--;
          this.setFocusOnInput();
        }
      } else if (keyCode === 39) {

        if ( this.activeIndex === 0 || this.activeIndex === 1 ) {
          this.activeIndex++;
          this.setFocusOnInput();
        }

      }

    }

  }

  private setFocusOnInput() {

   let controls = this.elemRef.nativeElement.getElementsByClassName('timepicker__field'),
       self = this;

    controls[this.activeIndex].focus();

    window.setTimeout( () => {

      controls[self.activeIndex].setSelectionRange(0, 2);

    });

  }

  public enteredTime( event: any ) {

    if (event.which < 48 || event.which > 57) {
      event.preventDefault();
    }

  }

  public onBlur( inputName: string, index: number ) {

   let focusedInput = this.fg.controls[inputName];

    if ( index !== 0 ) {

      if ( this.ranges[index] > 59 ) {
        focusedInput.setValue(59);
        this.ranges[index] = 59;
      }

    } else {

      if ( this.ranges[index] > 12 ) {
        focusedInput.setValue(12);
        this.ranges[index] = 12;
      }

    }

    this.setValueControl( this.ranges );

    focusedInput.setValue(this.formatTime(this.ranges[index]));

  }

  public onFocusField(event) {

    event.target.setSelectionRange(0, 2);

  }

  private _onChange = (_: any) => {};

  private _onTouched = () => { };

  public writeValue(val: any) {

      if (val !== undefined) {
        this._value = val;
        this.ranges = this._value;
      } else {
        this.ranges = [12, 0, 0];
      }

    this.createFormGroup();

  }

  get value(): any {
    return this._value;
  }

  set value( val ) {
    this._value = val;
    this._onChange( val );
  }

  public setValueControl(val) {

      this.value = val;

  }

  public registerOnChange( fn: (_: any) => void): void { this._onChange = fn; }

  public registerOnTouched( fn: () => void): void { this._onTouched = fn; }

}
