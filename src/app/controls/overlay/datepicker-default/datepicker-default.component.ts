import { Component, ElementRef, OnInit, Renderer2 }  from '@angular/core';
import {DatepickerOverlayComponent}         from '../datepicker-overlay/datepicker-overlay.component';
import { FormControl }           from '@angular/forms';
import { OverlayService } from '../../../services/overlay.service';
import { DataBindingService } from '../../../services/data.binding.service';


@Component({
  selector: 'datepicker-default',
  templateUrl: './datepicker-default.component.html',
  styleUrls: ['./datepicker-default.component.scss']
})

export class DatepickerDefaultComponent  extends DatepickerOverlayComponent implements OnInit {

  public selectedDate: Object;

  public isValid: boolean = false;

  public timepickerControl: FormControl;

  public amPmSelector: boolean = true;

  constructor(protected _elemRef: ElementRef,
              protected _overlayService: OverlayService,
              protected _databindingService: DataBindingService,
              protected _render: Renderer2) {
    super(_elemRef, _overlayService, _databindingService, _render)
  }

  ngOnInit(): void {

    this.subscribeOnSelectedElement();

    this.setTimeInTimePicker();

    this.setInitValues();

    this.setMonth();

    this.validateForms();

  }

  public chooseDay( day: Object, event ) {

    this.checkInPickedDayInThisMonth( day );

    event.stopPropagation();

    this.validateForms();

  }

  public getDayView( day: Object ) {

    return new Date( day['year'], day['month'], day['day'] ).getTime();

  }

  public isSelected( day: Object ) {

    return (
        this.selectedDate && day['day'] ===
        this.selectedDate['day'] && day['month'] ===
        this.selectedDate['month'] && this.year === this.selectedDate['year']
    );

  }

  public checkInPickedDayInThisMonth( day: Object ) {

    if ( day['month'] !== this.month ) {

      this.switchMonth(day['month']);

    } else {

      this.setDay( day );

    }

  }

  public setDay( day: Object ) {

    this.selectedDate = {
      month: day['month'],
      day: day['day'],
      year: this.year
    };

  }

  public saveDate() {

    this.validateForms();

    this.formateTimestampData();

    this.setChoosedValue(this.selectedDateTimestamp);

    this.closeDropDown();

  }

  public validateForms() {

    let successValidator = 0;

    if ( this.selectedDate ) {

      successValidator++;

    }

    if ( successValidator >= 1 ) {

      this.isValid = true;

    } else {

      this.isValid = false;

    }


  }

  public formateTimestampData() {

    let day = this.transformInputData(),
        month =   this.transformTimepickerData(),
        am =  this.setTimeInTimePicker();

    this.selectedDateTimestamp = day + month + am;

  }

  public transformInputData() {

    let timestamp = new Date( this.selectedDate['year'], this.selectedDate['month'], this.selectedDate['day'] ).getTime();

    return timestamp;

  }

  public transformTimepickerData (): number {

    let timepickerValue = this.timepickerControl.value,
        timepickerMSeconds;

      if (!timepickerValue) {
        return;
      }

      timepickerMSeconds = (timepickerValue[0] * 3600 + timepickerValue[1] * 60 + timepickerValue[2]) * 1000;

      return timepickerMSeconds;

  }

  public setTimeInTimePicker() {

    if ( !this.amPmSelector ) {

      return 43200000;

    } else {

      return 0;

    }

  }

  public setInitValues(): void {

    let initDate;

      if (this.selected['key'] || this.selected['key'] === 0) {
        initDate = new Date( this.selected['key'] );
      } else {
        initDate = new Date();
      }

      let date = initDate,
          year = date.getFullYear(),
          month = date.getMonth(),
          hours = date.getHours(),
          minutes = date.getMinutes(),
          seconds = date.getSeconds();

      if ( date.getHours() > 12 ) {

        this.amPmSelector = false;

      } else {

        this.amPmSelector = true;

      }

      this.selectedDate = {
        month: month,
        day: date.getDate(),
        year: year
      };

      this.year = year;

      this.month = month;

      this.currentMonthName = new Date( this.year, this.month, 1 );

      if ( hours > 12 ) {
        hours = hours - 12;
      }

      this.setTimer(hours, minutes, seconds);

  }

  public setTimer(hours, minutes, seconds): void {

    this.timepickerControl = new FormControl([hours, minutes, seconds]);

  }

}
