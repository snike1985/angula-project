import {
  Component,
  ElementRef,
  forwardRef,
  OnInit
} from '@angular/core';
import { SelectControlComponent } from '../selectcontrol/selectcontrol.component';
import { OverlayService } from '../../services/overlay.service';
import { DataBindingService } from '../../services/data.binding.service';
import { NumberFormatPipe } from '../../pipes/number-format.pipe';
import { AmounControlConfig } from '../../config/amount.config';
import { NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'amount-control',
  templateUrl: './amount-control.component.html',
  styleUrls: ['./amount-control.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef( () => AmountControlComponent ),
      multi: true
    }
  ]
})
export class AmountControlComponent extends SelectControlComponent {

  public amountConfig: any;


  constructor( protected _overlayService: OverlayService,
    protected _dataBindingService: DataBindingService,
    protected _elemRef: ElementRef,
    private numberFormatPipe: NumberFormatPipe) {

    super( _overlayService, _dataBindingService, _elemRef );

  }


  public formatAmountResult(values): Object {

    let result = {};

    if (values['approved']) {

      result['approved'] = {};

      if (!values['approved']['from']) {
        result['approved']['from'] = '0 - ';
      } else {
        result['approved']['from'] = this.numberFormatPipe.transform( values['approved']['from'] ) + ' - ';
      }

      if (!values['approved']['to']) {
        result['approved']['from'] = this.numberFormatPipe.transform( values['approved']['from'] );
        result['approved']['to'] = '';
      } else {
        result['approved']['to'] = this.numberFormatPipe.transform( values['approved']['to'] );
      }

    }

    if (values['requested']) {

      result['requested'] = {};

      if (!values['requested']['from']) {
        result['requested']['from'] = '0 - ';
      } else {
        result['requested']['from'] =  this.numberFormatPipe.transform( values['requested']['from'] ) + ' - ';
      }


      if (!values['requested']['to']) {
        result['requested']['from'] =  this.numberFormatPipe.transform( values['requested']['from'] );
        result['requested']['to'] = '';
      } else {
        result['requested']['to'] =  this.numberFormatPipe.transform( values['requested']['to'] );
      }

    }

    return result;

  }

  public setNameForAmount(value): void {

    let formatedValues, formatedRequestName, formatedApproveName;

    this.amountConfig = AmounControlConfig;

    if (value && value.toString() === '-1') {

      this.selectedValue = this.amountConfig['texts'][this.lang]['any'];

    } else {

      formatedValues = this.formatAmountResult(value);

      if (formatedValues.requested) {
        formatedRequestName = `R: ${formatedValues['requested']['from']} ${formatedValues['requested']['to']}; `;
      } else {
        formatedRequestName = '';
      }

      if (formatedValues.approved) {
        formatedApproveName = `A: ${formatedValues['approved']['from']} ${formatedValues['approved']['to']};`;
      } else {
        formatedApproveName = '';
      }

      this.selectedValue = formatedRequestName + formatedApproveName;

    }

  }

  public checkSelectedNameFormat(value: any): void {

    this.setNameForAmount(value);

  }


}
