import { AfterViewInit, Component, ElementRef, OnInit, Renderer2 } from '@angular/core';
import { SimpleDropdownComponent }                 from '../simpledropdown/simpledropdown.component';
import { FlyInOut }                                from '../../../config/animations.config';
import {OverlayService}                            from '../../../services/overlay.service';
import { FormControl, FormGroup }                  from '@angular/forms';
import { Subscription }                            from 'rxjs/Subscription';


@Component({
  selector: 'combodropdown',
  templateUrl: './combodropdown.component.html',
  styleUrls: ['./combodropdown.component.scss'],
  animations: [ FlyInOut ]
})

export class ComboDropdownComponent extends SimpleDropdownComponent implements OnInit, AfterViewInit  {

  constructor(
      public _overlayService: OverlayService,
      public _render: Renderer2,
      public _elemRef: ElementRef) {
      super(_overlayService, _render, _elemRef);
  }

  public isCoincidence( value: string ) {

    if ( this.searchTerm ) {

      let re = new RegExp(this.searchTerm, 'i'),

          result = value.match(re);

      return result && result[0];

    } else {

      return true;

    }

  }

  public searchTerm: string = null;

  public options: object[];

  public selected: object[];

  public label: string = '';

  public onKeyUp(event): void {

    this.searchTerm = event.target.value;

  }

  public formGroupSubscription: Subscription;

  public anyControlSubscription: Subscription;

  public fg: FormGroup;

  public anyControl: FormControl;

  public currentCheckedOptions: Object;

  public cancel() {

    this.closeDropDown();

  }

  public submit({value}) {

    let result = '';

    for (const key of Object.keys(value)) {

      if ( value[key] ) {

        result += key + ',';

      }

    }

    if ( result !== '' ) {

      result = result.slice(0, -1);

    }

    let select = this.selected['select'];

    let currentSelect = {
      'key' : result,
      'select' : select,
      'positions': this.selected['positions']
    };

    this._overlayService.selectOption( currentSelect );

    this.closeDropDown();

  }

  ngOnInit() {

    this.subscriptionActiveDropDown =  this._overlayService.activeDropDown$

        .subscribe(
            ( result ) => {

              this.options = result.data;

              if ( result === false ) {

                this.setToNullOpenedPopup();
              }

            }
        );

    this.subscriptionSelectedOption = this._overlayService.selectedOption$

        .subscribe(
            ( selected ) => {

              this.selected = selected;

              this.setDropDownPosition();

              this.label = selected['label'];

            }
        );

   this.createFormGroup();

   this.formGroupSubscribe();

   this.anyControlSubscribe();

  }

  ngAfterViewInit() {
    this.setDropDownPosition();
  }

  public createFormGroup(): void {

    let formControls =  this.generateFormControls();

    this.fg = new FormGroup(
        formControls
    );

  }

  public generateFormControls() {

    let formControls = {},
        anyFunction = true;

    for (let option of this.options) {

      let value = option['value'];

      if ( value !== '-1' ) {

        let asd = this.checkIfAlreadySelected(value),
            controlValue = this.checkIfAlreadySelected(value);

        if (controlValue) {
          anyFunction = false;
        }

        formControls[value] = new FormControl(controlValue);
      }

    }


    this.anyControl = new FormControl(anyFunction);

    return formControls;

  }

  public checkIfAlreadySelected( key: string ) {

    let selectedValues = this.selected['key'].split(',');

    return selectedValues.indexOf( String(key) ) > -1;

  }

  public formGroupSubscribe() {

    this.currentCheckedOptions = this.fg.getRawValue();

    this.formGroupSubscription = this.fg.valueChanges
        .subscribe(

          (data) => {

           this.currentCheckedOptions = data;

           this.checkAnyControl(data);

        }

    );

  }

  public anyControlSubscribe() {

    this.anyControlSubscription = this.anyControl.valueChanges
        .subscribe(

            (data) => {

                if ( !data ) {

                  this.checkFormGroupControls(data);

                } else {

                  this.setAllControlsTo(false);

                }

            }

        );

  }

  public checkAnyControl( data ) {

    let changes: boolean = true;

    for (const key of Object.keys(data)) {

      if ( data[key] ) {
        changes = !changes;
        break;
      }

    }

    this.anyControl.setValue(changes);

  }

  public checkFormGroupControls( data ) {

    let activeControl = false;

    for (const key of Object.keys(this.currentCheckedOptions)) {

      if ( this.currentCheckedOptions[key] ) {
        activeControl = !activeControl;
        break;
      }

    }

    if ( !activeControl ) {
      this.setAllControlsTo(true);
    }

  }

  public setAllControlsTo(to: boolean) {

    let controls = this.fg.controls;

    for (const key of Object.keys(controls)) {

      if ( this.currentCheckedOptions[key] === to  ) {
        continue;
      }

    }

  }

}
