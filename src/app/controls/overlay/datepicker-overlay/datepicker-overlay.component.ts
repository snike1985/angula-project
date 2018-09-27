import { ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';

import { OverlayService }                             from '../../../services/overlay.service';
import { Subscription }                               from 'rxjs/Subscription';
import { DataBindingService }                         from '../../../services/data.binding.service';


export class DatepickerOverlayComponent implements OnInit, OnDestroy {

    public daysOnMonthView: number = 42;
    public today: number;
    public days: Object[] = [];
    public date: Date;
    public year: number;
    public month: number;
    public currentMonth: number;
    public currentYear: number;
    public currentMonthName: Date;
    public subscriptionSelectedOption: Subscription;
    public subscriptionCurrentLanguage: Subscription;
    public selected: object;
    public selectedDateTimestamp: number;
    public controlName: string;
    public currentLanguage: string;

    @HostListener('document:click', ['$event'])
    clickout(event) {

        if (!(this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0].contains(event.target))) {

            this.closeDropDown();

        }

    }

    constructor(protected _elemRef: ElementRef,
                protected _overlayService: OverlayService,
                protected _databindingService: DataBindingService,
                protected _render: Renderer2) {

        this.setCurrentDate();

        this.subscribeOnCurrentLanguage();

    }

    ngOnInit() {



        this.date = new Date;

        this.year = this.date.getFullYear();

        this.month = this.date.getMonth();

        this.currentMonthName = new Date(this.year, this.month, 1);

        this.setMonth();

        this.subscribeOnSelectedElement();

    }

    public setMonth() {

        let firstWeekDayInMonth = new Date(this.year, this.month, 1).getDay();

        let prevDays = this.getPreviousMonthDays(firstWeekDayInMonth, this.year, this.month);

        this.days = this.days.concat(prevDays);

        this.days = this.days.concat(this.getCurrentMonth(this.year, this.month));

        this.days = this.days.concat(this.getNextMonthDays((this.daysOnMonthView - this.days.length), this.month));

        this.days = this.dropDaysObjectBy7DaysInEach(this.days);

    }

    private getPreviousMonthDays(firstCurrentMonthDay: number, currentYear: number, currentMonth: number) {

        let prevDays: Object[] = [],
            lastDayInPrevMonth: number;

        if (firstCurrentMonthDay > 0) {

            let neededDays = firstCurrentMonthDay;

            lastDayInPrevMonth = new Date(currentYear, currentMonth, 0).getDate();

            for (let _i = 0; _i < neededDays; _i++) {


                let prevItem = {
                    day: lastDayInPrevMonth - _i,
                    month: currentMonth - 1
                };

                prevDays.push(prevItem);

            }

            prevDays = prevDays.reverse();

        }

        return prevDays;

    }

    public getNextMonthDays(daysCount: number, month: number) {

        let nextMonthDays: Object[] = [];

        for (let _i = 1; _i <= daysCount; _i++) {

            let next = {
                day: _i,
                month: month + 1
            };

            nextMonthDays.push(next);

        }

        return nextMonthDays;

    }

    private getCurrentMonth(year: number, month: number) {

        let lastDayInMonth = new Date(year, (month + 1), 0).getDate();

        let monthDays: Object[] = [];

        for (let _i = 1; _i <= lastDayInMonth; _i++) {

            let item = {
                day: _i,
                month: month
            };

            monthDays.push(item);

        }

        return monthDays;

    }

    private dropDaysObjectBy7DaysInEach(days: Object[]) {

        let newObject: any = [],
            currentItem: Object[] = [];

        days.forEach((item, index) => {

            currentItem.push(item);

            if (currentItem.length === 7) {

                newObject.push(currentItem);

                currentItem = [];

            }

        });

        return newObject;

    }

    public getNextMonth() {

        this.switchMonth(this.month + 1);

    }

    public getPrevMonth() {

        this.switchMonth(this.month - 1);

    }

    public switchMonth(month: number) {

        let newDate = new Date(this.year, month, 1);

        this.days = [];

        this.year = newDate.getFullYear();

        this.month = newDate.getMonth();

        this.currentMonthName = new Date(this.year, this.month, 1);

        this.setMonth();

    }

    private setCurrentDate() {
        let date = new Date();
        this.today = date.getDate();
        this.currentMonth = date.getMonth();
        this.currentYear = date.getFullYear();
    }

    public setDropDownPosition() {

        let dropDownWrap = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0],

            positions = this.selected['positions'];

        this.renderElement(dropDownWrap, positions);

    }

    public renderElement(dropDownWrap, positions) {

        let hideElement = this._elemRef.nativeElement.getElementsByClassName('hide_element')[0];

        this._render.setStyle(dropDownWrap, 'top', positions['top']);

        this._render.setStyle(dropDownWrap, 'left', positions['left']);

        this._render.addClass(dropDownWrap, positions['classForWrap']);

        if (hideElement) {

            this._render.setStyle(hideElement, 'width', positions['width']);

            this._render.setStyle(hideElement, 'right', positions['lineForHideElem']);

            this._render.setStyle(hideElement, 'height', positions['height']);

            if ( positions['classForWrap'] === 'overlay_right' )  {

                this._render.setStyle(hideElement, 'top', positions['difference']);

                this._render.setStyle(hideElement, 'left', '-4px');

            } else if (positions['classForWrap'] === 'overlay_left') {

                this._render.setStyle(hideElement, 'top', positions['difference']);

                this._render.setStyle(hideElement, 'right', '-4px');

            }

        }

    }

    public closeDropDown() {

        this._overlayService.closeDropDown();

    }

    public subscribeOnSelectedElement() {

        this.subscriptionSelectedOption = this._overlayService.selectedOption$

            .subscribe(

                (selected) => {

                    this.selected = selected;

                    this.controlName = this.selected['select'];

                    this.setDropDownPosition();

                }
            );

    }

    public unSubscribeAll() {

        this.unSubscribeSelectedOptions();

    }

    public unSubscribeSelectedOptions() {

        if (this.selected) {

            this.subscriptionSelectedOption.unsubscribe();

        }

    }

    ngOnDestroy() {

        this.unSubscribeAll();

        this.unSubscribeFromCurrentLanguage();

    }

    public setChoosedValue(key: any, customValue: any = null): void {

        this._overlayService.selectOption({
            'key': key,
            'select': this.controlName,
            'positions': this.selected['positions'],
            'dropDownClass': this.selected['dropDownClass'],
            'custom_field': customValue
        });

    }

    public subscribeOnCurrentLanguage() {

        this.subscriptionCurrentLanguage = this._databindingService.globalSettings.subscribe(
            (settings) => {

                if (settings && settings['settingDto']) {

                    this.currentLanguage = settings['settingDto']['language'];

                }

            }
        );

    }

    public unSubscribeFromCurrentLanguage() {

        this.subscriptionCurrentLanguage.unsubscribe();

    }

}
