import { Component, ElementRef, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { OverlayService } from '../../services/overlay.service';
import { DataBindingService } from '../../services/data.binding.service';
import { Subscription } from 'rxjs/Subscription';
import { DropDown } from '../../interfaces/dropdown';
import { DatepickerDefaultComponent } from '../overlay/datepicker-default/datepicker-default.component';
import { DatepickerRangeComponent } from '../overlay/datepicker-range/datepicker-range.component';
import { DatepickerRanges } from '../../config/rangepicker.config';



@Component({
    selector: 'datepicker-control',
    templateUrl: './datepicker-control.component.html',
    styleUrls: ['./datepicker-control.component.scss'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => DatepickerControlComponent),
            multi: true
        }
    ]
})

export class DatepickerControlComponent implements OnInit, OnDestroy, ControlValueAccessor {

    @Input('value') private _value;
    @Input() public type: number;
    @Input() public controlClassName: string = null;
    @Input() public label: string = null;
    @Input() public required: any = false;

    // @Input() public lang: string = null;
    public lang: string = 'en_EN';
    public datepickerRangesTextIndex: number;

    public controlName: string;
    public isOpen: boolean;
    public data: any = 'any';
    public displayValue: string;
    public datepickerRangesText: Object[];

    public subscriptionSelectedOption: Subscription;
    public subscriptionViewSize: Subscription;
    public contentScrollTopSubscription: Subscription;
    public subscriptionActiveDropDown: Subscription;

    public dropDown: any;
    public contentScrollTop: any;
    public viewSize: number;
    public activeSelectName: string;
    public datepicker: any;
    public className: string;
    public options: Object;

    public defaultPickerWidth: number = 359;
    public defaultRangePickerWidth: number = 628;
    public defaultPickerHeight: number = 415;
    public defaultRangePickerHeight: number = 491;

    constructor(private _overlayService: OverlayService,
                private _dataBindingService: DataBindingService,
                private _elemRef: ElementRef) {

        this.setUniqueControlName();

        this._overlayService.dropDownOpen.subscribe(
            (isOpen) => {

                this.isOpen = isOpen;
            }
        );

        this.subscriptionViewSize = this._dataBindingService.viewSize.subscribe(
            (viewSize) => {
                this.viewSize = viewSize;

                _overlayService.closeDropDown();
            }
        );

        this.contentScrollTopSubscription = _dataBindingService.contentScrollTop.subscribe(
            (contentScrollTop) => {

                this.contentScrollTop = contentScrollTop;

                this._overlayService.closeDropDown();

            }
        );

        this.subscriptionActiveDropDown = _overlayService.activeDropDown$.subscribe(
            (dropDown) => {

                if (!dropDown && this.activeSelectName === this.controlName) {
                    this._onTouched();
                }

                if (!dropDown) {

                    this.activeSelectName = '';

                }

                this.dropDown = dropDown;

            }
        );

        this.subscriptionSelectedOption = this._overlayService.selectedOption$.subscribe(

            (value) => {

                if (value && value['select'] === this.controlName) {

                    if (this.value !== value['key']) {
                        this.value = value['key'];
                        this.setDefaultValue(value['custom_field']);
                        if (value['custom_field']) {
                            this.datepickerRangesTextIndex = value['custom_field'];
                        }
                    }

                    this.activeSelectName = value['select'];

                } else {

                    this.activeSelectName = '';
                }

            }
        );

    }

    ngOnInit() {

        this.checkTypeDatepicker();

    }

    ngOnDestroy() {
        this.unSubscribeAll();
    }

    private checkTypeDatepicker() {

        if (this.type === 0) {

            this.datepicker = DatepickerDefaultComponent;

        } else if (this.type === 1) {

            this.datepicker = DatepickerRangeComponent;

            this.datepickerRangesText = DatepickerRanges['texts'][this.lang];

        }

    }

    public openDatepicker(event) {

        this._overlayService.dropDownOpen.next(true);

        if (this.isOpen && this.activeSelectName === this.controlName) {

            this._overlayService.closeDropDown();

            this._overlayService.dropDownOpen.next(false);

        } else {

            this._overlayService.selectOption(this.getOptionsObject());

            event.stopPropagation();

            this._overlayService.addDropDown(
                new DropDown(this.datepicker, this.data, 'selected')
            );

        }

    }

    private _onChange = (_: any) => {
    };

    private _onTouched = () => {
    };

    public writeValue(val: any) {

        if ( val !== undefined ) {

            this._value = val;

        }

        this.setDefaultValue();

    }

    public setDefaultValue(customField?: any): void {

        this.displayValue = this.value;

        if (this.type === 1) {

            if (this.value === '-1') {
                this.displayValue = this.getRangeNameByValue('-1');
            } else if (customField || customField === 0) {
                this.displayValue = this.getRangeNameByValue(customField);
            }

        } else if (this.type === 0) {

        }

    }

    public getRangeNameByValue(value: any): string {

        if (!this.datepickerRangesText) {
            return;
        }

        for (let range of this.datepickerRangesText) {
            if (range['value'].toString() === value.toString()) {
                return range['name'];
            }
        }

    }

    get value(): any {
        return this._value;
    }

    set value(val) {

        this._value = val;

        this._onChange(val);

    }

    public registerOnChange(fn: (_: any) => void): void {
        this._onChange = fn;
    }

    public registerOnTouched(fn: () => void): void {
        this._onTouched = fn;
    }

    public calculateDropDownPositions(): Object {

        let modificatedClass;

        if ( this.controlClassName ) {
            modificatedClass = this.controlClassName;
        } else {
            modificatedClass = 'datepicker-control';
        }

        let elementPosition = this._elemRef.nativeElement.getElementsByClassName(modificatedClass)[0].getBoundingClientRect(),
            topPosition, leftPosition, width, lineForHideElem, classForWrap, height, difference, currentDatepickerWidth, currentDatepickerHeight;
        difference = 0;
        lineForHideElem = 'auto';
        classForWrap = 'overlay_default';

            topPosition = elementPosition.bottom + 10;

            if (this.type) {
                topPosition = elementPosition.bottom + 10;
                currentDatepickerWidth = this.defaultRangePickerWidth;
                currentDatepickerHeight = this.defaultRangePickerHeight;
            } else {
                topPosition = elementPosition.bottom;
                currentDatepickerWidth = this.defaultPickerWidth;
                currentDatepickerHeight = this.defaultPickerHeight;
            }

            leftPosition = elementPosition.left + 'px';

            if (window.innerWidth - elementPosition.right <= (currentDatepickerWidth + 10)) {
                leftPosition = elementPosition.left - currentDatepickerWidth + elementPosition.width;
                lineForHideElem = 0;

            } else {
                leftPosition = elementPosition.left;
            }

            if (window.innerHeight - elementPosition.bottom <= currentDatepickerHeight) {

                difference = currentDatepickerHeight - (window.innerHeight - elementPosition.bottom);

                topPosition = elementPosition.top - difference - 10 + 50;

                difference =  elementPosition.top - topPosition;

                if (window.innerWidth - elementPosition.right > (currentDatepickerWidth + 10) ) {
                    leftPosition = leftPosition + elementPosition.width;
                    classForWrap = 'overlay_right';
                } else {
                    leftPosition = leftPosition - elementPosition.width;
                    classForWrap = 'overlay_left';
                }
            } else {
                difference = 0;
            }

            height = elementPosition.height + 'px';

            width = elementPosition.width + 'px';

        leftPosition = leftPosition + 'px';

        topPosition = topPosition + 'px';

        difference = difference + 'px';



        return {
            'top': topPosition,
            'difference': difference,
            'left': leftPosition,
            'height': height,
            'width': width,
            'lineForHideElem': lineForHideElem,
            'classForWrap': classForWrap
        };

    }

    public getOptionsObject(): Object {

        let initData: Object = {};

        initData = {
            'key': this.value,
            'select': this.controlName,
            'positions': this.calculateDropDownPositions(),
            'dropDownClass': this.className,
            'custom_field': this.datepickerRangesTextIndex
        };

        return initData;

    }

    public setUniqueControlName(): void {

        this.controlName = this.randomString();

    }

    public randomString() {
        let length = 123;
        let result = '', chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        for (let i = length; i > 0; --i) {
            result += chars[Math.floor(Math.random() * chars.length)];
        }
        return result;
    }

    public unSubscribeAll(): void {
        this.subscriptionSelectedOption.unsubscribe();
        this.subscriptionViewSize.unsubscribe();
        this.contentScrollTopSubscription.unsubscribe();
        this.subscriptionActiveDropDown.unsubscribe();
    }

}
