import { Component, ElementRef, OnInit, Renderer2 }          from '@angular/core';
import { DatepickerOverlayComponent } from '../datepicker-overlay/datepicker-overlay.component';
import { DatepickerRanges }           from '../../../config/rangepicker.config';
import { OverlayService } from '../../../services/overlay.service';
import { DataBindingService } from '../../../services/data.binding.service';

@Component({
  selector: 'datepicker-range',
  templateUrl: './datepicker-range.component.html',
  styleUrls: ['./datepicker-range.component.scss']
})
export class DatepickerRangeComponent extends DatepickerOverlayComponent implements OnInit {

  public date: Date;
  public year: number;
  public month: number;
  public startRange: Object = null;
  public endRange: Object = null;
  public currentMonthName: Date;
  public isRangeSelected: boolean = false;
  public order: number = 1;
  public rangesMenu: Object;
  public selectedMenuRange: number = -1;
  public isValid: boolean = false;

  constructor(protected _elemRef: ElementRef,
              protected _overlayService: OverlayService,
              protected _databindingService: DataBindingService,
              protected _render: Renderer2) {
            super(_elemRef, _overlayService, _databindingService, _render)

  }

  ngOnInit() {

    this.subscribeOnSelectedElement();

    this.setInitRange();

    this.setInitDate();

    this.setMonth();

  }

  public setInitDate(): void {

    if (this.startRange) {
      this.date = new Date(this.getTimestampFromRange(this.endRange));
    } else {
      this.date = new Date;
    }


    this.year = this.date.getFullYear();

    this.month = this.date.getMonth();

    this.currentMonthName = new Date(this.year, this.month, 1);

    this.checkIfAnyRangeSelected();

    this.getRangesMenu();

    this.checkIfAllRangesSelected();

  }

  public chooseDate(day, event): void {

    this.setOrder();

    this.checkInPickedDayInThisMonth( day );

    event.stopPropagation();

  }

  private checkIfAnyRangeSelected(): void {

    if (this.startRange || this.endRange) {

      this.isRangeSelected = true;

    }

  }

  private setOrder(): void {


    if (this.startRange) {

      this.order = 2;

    } else if (!this.startRange) {

      this.order = 1;

    }

  }

  private setRange(day: Object): void {

    this.selectedMenuRange = 5;

    if ( this.order === 1 ) {

      this.startRange = day;

      this.startRange['year'] = this.year;

    } else if ( this.order === 2 ) {

      this.endRange = day;

      this.endRange['year'] = this.year;

    }

    this.checkIfAnyRangeSelected();

    this.checkIfAllRangesSelected();

  }

  public isSelected( day: Object ): boolean {

    return (
        this.startRange && day['day'] === this.startRange['day'] &&
        day['month'] === this.startRange['month'] &&
        this.year === this.startRange['year']) || (
            this.endRange && day['day'] === this.endRange['day'] &&
            day['month'] === this.endRange['month'] &&
            this.year === this.endRange['year']
        );

  }

  public inRange( day: Object ): boolean {

    if ( !this.startRange || !this.endRange ) {
      return;
    }

    let currentDay = new Date( this.year, day['month'], day['day'] ).getTime(),
        startDayTimestamp = this.getTimestampFromRange( this.startRange ),
        endDayTimestamp = this.getTimestampFromRange( this.endRange );

   return  ( this.startRange || this.endRange ) &&  currentDay >= startDayTimestamp && currentDay <= endDayTimestamp;

  }

  public getTimestampFromRange(day: Object ): number {

    return new Date( day['year'], day['month'], day['day'] ).getTime();
  }

  public reCheckRange(order, event): void {

    if ( order === 1 ) {

      this.startRange = null;

    } else if ( order === 2 ) {

      this.endRange = null;

    }

    this.order = order;

    this.checkIfAllRangesSelected();

    event.stopPropagation();

  }

  public checkInPickedDayInThisMonth( day: Object ): void {

    if ( day['month'] !== this.month ) {

      this.switchMonth(day['month']);

    } else {

      this.setRange( day );

    }

  }

  public getRangesMenu (): void {

    this.rangesMenu = DatepickerRanges['texts'][this.currentLanguage];

  }

  public setMenuRange( value: number ): void {

    this.selectedMenuRange = value;

    this.setChoosedRange();

    this.checkIfAllRangesSelected();

  }

  public setCurrentMenuRange(value: number): void {

    this.setMenuRange(value);

    if (this.endRange && (this.endRange['month'] !== this.month || this.endRange['year'] !== this.year) ) {
      console.log('HERE');
      this.setMonthbyEndRange();
    }

  }

  public setChoosedRange (): void {

    switch ( this.selectedMenuRange ) {

      case -1: {
        this.isRangeSelected = false;
        this.clearRange();
        break;
      }
      case 1: {
        this.setThisWeek();
        break;
      }
      case 2: {
        this.setThisMonth();
        break;
      }
      case 3: {
        this.setLast6Month();
        break;
      }
      case 4: {
        this.setLastYear();
        break;
      }
      case 5: {
        this.isRangeSelected = true;
        this.order = 1;
        this.clearRange();
        break;
      }

    }

    this.checkIfAnyRangeSelected();

  }

  public clearRange(): void {

    this.startRange = null;

    this.endRange = null;

  }

  public setThisWeek(): void {

    let startRangeDate = new Date( this.currentYear, this.currentMonth, (this.today - 6) );

    this.setRangesFromMenu(startRangeDate);
  }

  public setThisMonth(): void {

    let startRangeDate = new Date( this.currentYear, (this.currentMonth - 1), (this.today + 1) );

    this.setRangesFromMenu(startRangeDate);

  }

  public setLast6Month(): void {

    let startRangeDate = new Date( this.currentYear, (this.currentMonth - 6), (this.today + 1) );

    this.setRangesFromMenu(startRangeDate);

  }

  public setLastYear(): void {

    let startRangeDate = new Date( (this.currentYear - 1), this.currentMonth, (this.today + 1) );

    this.setRangesFromMenu(startRangeDate);

  }

  public setRangesFromMenu( startRangeDate: Date ): void {

    this.endRange = this.formatRangeObject( this.currentYear, this.currentMonth, this.today );

    this.startRange = this.formatRangeObject( startRangeDate.getFullYear(), startRangeDate.getMonth(), startRangeDate.getDate() );

  }

  public checkIfAllRangesSelected(): void {

    if ( this.endRange && this.startRange ) {

      this.isValid = true;

    } else if (this.endRange && !this.startRange || !this.endRange && this.startRange) {

      this.isValid = false;

    } else {

      this.isValid = true;

    }

  }

  public formatRangeObject ( year: number, month: number, day: number ): Object {

    return {
      day: day,
      month: month,
      year: year
    };
  }

  public applyFilter(): void {

    this.formateTimestampRangeString();

    this.setChoosedValue(this.formateTimestampRangeString(), this.selectedMenuRange);

    this.closeDropDown();

  }

  public formateTimestampRangeString(): any {

    if (!this.startRange && !this.endRange) {
      return '-1';
    }

    let startDate = this.getTimestampFromRange( this.startRange ) / 1000,
        endDate = ( this.getTimestampFromRange( this.endRange ) / 1000 ) + 86400 - 1;

    return startDate + '-' + endDate;

  }

  public setInitRange() {

    if (this.selected && this.selected['key'] ) {

      let startRange, endRange;

      if ( this.selected['custom_field'] === 5) {

      let ranges = this.selected['key'].split(',');

        this.selectedMenuRange = this.selected['custom_field'];

        startRange =  new Date(ranges[0] * 1000);

        endRange = new Date(ranges[1] * 1000);

        this.startRange = this.formatRangeObject( startRange.getFullYear(), startRange.getMonth(), startRange.getDate() );

        this.endRange = this.formatRangeObject( endRange.getFullYear(), endRange.getMonth(), endRange.getDate() );

      } else {

        if (this.selected['custom_field']) {

          this.setMenuRange(this.selected['custom_field']);

        }

      }

    }

  }

  public setMonthbyEndRange() {

    if (this.endRange && this.endRange['month'] && this.endRange['year']) {

      let newDate = new Date(this.endRange['year'], this.endRange['month'], 1);

      this.days = [];

      this.year = newDate.getFullYear();

      this.month = newDate.getMonth();

      this.currentMonthName = new Date(this.year, this.month, 1);

      this.setMonth();

    }

  }

}
