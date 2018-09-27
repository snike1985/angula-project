import { Component, OnInit } from '@angular/core';
import { GlobalOverlayComponent } from '../global-overlay/global-overlay.component';
import { FormControl, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'combo-merchant-options',
  templateUrl: './combomerchantoptions.component.html',
  styleUrls: ['./combomerchantoptions.component.scss']
})
export class ComboMerchantOptionsComponent extends GlobalOverlayComponent {

  private fg: FormGroup;

  public anyControl: FormControl;
  
  private formGroupSubscription: Subscription;

  private createFormGroup() {

    this.fg = new FormGroup (this.createFormControls());

  }

  private createFormControls() {

    let newFormControls: any = {};

    for (let services of this.options) {

      for (let service of services['options']) {

        let serviceValue = service['value'];

          newFormControls[serviceValue] =  new FormControl(this.checkIfAlreadySelected(serviceValue));

      }

    }

    return newFormControls;
  }

  private checkIfAlreadySelected( key: string ) {

    let selectedValues = this.selected['key'].split(',');

    return selectedValues.indexOf(key) > -1;

  }

  private subscribeOnformGroup(): void {

    this.formGroupSubscription = this.fg.valueChanges.subscribe(

        (controls) => {

          this.checkIfAnySelected(controls);

        }

    );

  }

  private unSubscribeFromFormgroup(): void {

    this.formGroupSubscription.unsubscribe();

  }

  private checkIfAnySelected( data: Object ): boolean {

    let changes: boolean = false;

    for (let key in data) {

      if ( data[key] ) {
        changes = true;
        break;
      }

    }


    if ( this.anyControl ) {

      this.anyControl.setValue((!changes));

    }

    return changes;

  }

  private setAnyControl(): void {
    this.anyControl = new FormControl( !this.checkIfAnySelected(this.fg.getRawValue()) );
  }

  private checkIfThisGlobalValue(value: Object): boolean {

    return value['options'][0]['value'] !== -1;

  }

  public submit({value}) {

   this.sendSelectedServices({value});

   this.closeDropDown();

  }

  private sendSelectedServices({value}): void {

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

  }

  public extendsOnDestroy() {

    this.unSubscribeFromFormgroup();

  }

  public extendOnInit() {

    this.createFormGroup();

    this.subscribeOnformGroup();

    this.setAnyControl();

  }

  public renderElement( dropDownWrap, positions ) {

    this._render.setStyle(dropDownWrap, 'top', positions['top']);

    this._render.setStyle(dropDownWrap, 'left', positions['left']);

    this._render.setStyle(dropDownWrap, 'height', positions['height']);

    if (positions['right']) {
      this._render.setStyle(dropDownWrap, 'right', positions['right']);
    }

  }

}
