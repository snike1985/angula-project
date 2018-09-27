import { Component, ElementRef, Renderer2 }         from '@angular/core';
import { GlobalOverlayComponent }                   from '../global-overlay/global-overlay.component';
import { FormControl, FormGroup, Validators }                                from '@angular/forms';
import { Subscription }                             from 'rxjs/Subscription';
import { OverlayService }                           from '../../../services/overlay.service';
import { DataBindingService }                       from '../../../services/data.binding.service';
import { AmounControlConfig }                       from '../../../config/amount.config';

@Component({
  selector: 'amountdropdown',
  templateUrl: './amountdropdown.component.html',
  styleUrls: ['./amountdropdown.component.scss']
})
export class AmountDropdownComponent extends GlobalOverlayComponent {

  private fg: FormGroup;

  private amounControlConfig: Object = AmounControlConfig;

  private currentLanguage: string;

  private subscriptionGlobalSettings: Subscription;

  private subscriptionAnyAmount: Subscription;

  private subscriptionFormGroup: Subscription;

  private anyAmount: FormControl;


  constructor( public _overlayService: OverlayService,
               public _render: Renderer2,
               public _elemRef: ElementRef,
               public _dataBindingService: DataBindingService) {
    super(_overlayService, _render, _elemRef);
  }

  private subscribeOnGlobalSettings(): void {

      this.subscriptionGlobalSettings = this._dataBindingService.globalSettings.subscribe(

          (settings) => {

            if ( settings && settings['settingDto'] ) {

              this.currentLanguage = settings['settingDto']['language'];

            }

          }
      );
  }

  private unSubscribeFromGlobalSettings(): void {

      this.subscriptionGlobalSettings.unsubscribe();

  }

  private createFormGroup(): void {

    this.fg = new FormGroup({
      fromRequestAmount: new FormControl(this.createRangeFormControll('requested', 'from')),
      toRequestAmount: new FormControl(this.createRangeFormControll('requested', 'to')),
      fromApprovedAmount: new FormControl(this.createRangeFormControll('approved', 'from')),
      toApprovedAmount: new FormControl(this.createRangeFormControll('approved', 'to')),
    });

  }

  private createRangeFormControll(type: string, range: string): number {

    if (this.selected && this.selected['key']) {
      if (this.selected['key'] === '-1' || !this.selected['key'][type]) {
        return null;
      } else {
        return this.selected['key'][type][range];
      }
    }

  }

  private subscribeOnAnyAmount(): void {
    this.subscriptionAnyAmount = this.anyAmount.valueChanges.subscribe(
        (amount) => {

          if (amount) {

              this.removeAllRanges();

              this.removeRequired();

          } else {

            if (!this.checkIfRangeSelected() ) {
              this.setAmountTo(true);
            }

          }

        }
    );
  }

  private setAmountTo(value: boolean) {

      this.anyAmount.setValue(value, {emitEvent: false});

  }

  private unSubscribeFromAnyAmount(): void {

    this.subscriptionAnyAmount.unsubscribe();

  }

  private createAnyAmountFormControl(): void {

    let value  = this.checkIfRangeSelected();

    this.anyAmount = new FormControl(!value);

  }

  private subscribeOnFormGroup(): void {

    this.subscriptionFormGroup = this.fg.valueChanges.subscribe(
        (controls) => {

          if (this.checkIfRangeSelected() ) {
            this.anyAmount.setValue(false);
          }

        }
    );

  }

  private checkIfRangeSelected() {

    let values = this.fg.getRawValue(),
    flag = false;

    if (values) {

      for (let k in values) {
        if (values[k]) {
          flag = true;
        }
      }

    }

    return flag;

  }

  private unSubscribeFromFormGroup(): void {

    this.subscriptionFormGroup.unsubscribe();

  }

  private removeAllRanges(): void {

    this.fg.reset();

  }

  private removeRequired(): void {

    let fg = this.fg.controls;

    Object.keys(fg).forEach(key => {

      fg[key].setValidators(null);

      fg[key].updateValueAndValidity();

    });

  }


  public extendsOnDestroy(): void {

    this.unSubscribeFromGlobalSettings();

    this.unSubscribeFromAnyAmount();

    this.unSubscribeFromFormGroup();

  }

  public extendOnInit(): void {

    this.subscribeOnGlobalSettings();

    this.createFormGroup();

    this.subscribeOnFormGroup();

    this.createAnyAmountFormControl();

    this.subscribeOnAnyAmount();

  }

  public submit({value}): void {

    let select, result;

    select = this.selected['select'];

    if ( this.checkIfRangeSelected() ) {

      result = this.formateResult();

    } else {
      result = '-1';
    }

    let currentSelect = {
      'key': result,
      'select': select,
      'positions': this.selected['positions']
    };

    this._overlayService.selectOption(currentSelect);

    this._overlayService.closeDropDown();

  }

  public onFill(event): void {

    if ( !(event.keyCode >= 48 && event.keyCode <= 57) ) {
      event.preventDefault();
    }

  }

  public formateResult(): Object {

    let values = this.fg.getRawValue();

    let returnedObject = {};

    if (this.ifEmptyString(values.fromRequestAmount) || this.ifEmptyString(values.toRequestAmount)) {
      returnedObject['requested'] = {
        from: values.fromRequestAmount,
        to: values.toRequestAmount
      }
    }

    if (this.ifEmptyString(values.fromApprovedAmount) || this.ifEmptyString(values.toApprovedAmount)) {
      returnedObject['approved'] = {
        from: values.fromApprovedAmount,
        to: values.toApprovedAmount
      }
    }

    return returnedObject;

  }

  public ifEmptyString(value): any {

    if (value === '') {
      return null;
    } else {
      return value;
    }

  }

}
