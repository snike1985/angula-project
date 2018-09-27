import { Component, ElementRef, HostListener, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { OverlayService }                                         from '../../../services/overlay.service';
import { Subscription }                                           from 'rxjs/Subscription';
import { FadeInOut, FlyInOut }                                    from '../../../config/animations.config';

@Component({
    selector: 'simpledropdown',
    templateUrl: './simpledropdown.component.html',
    styleUrls: ['./simpledropdown.component.scss'],
    animations: [FadeInOut]
})

export class SimpleDropdownComponent implements OnInit, OnDestroy {

    public options: object[];

    public selected: object;

    public subscriptionActiveDropDown: Subscription;

    public subscriptionSelectedOption: Subscription;

    public label: string = '';

    @HostListener('document:click', ['$event'])
    clickout(event) {

        if (this.options) {

            if (!this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0].contains(event.target)) {
                this.closeDropDown();
            }
        }

    }

    constructor(public _overlayService: OverlayService,
                public _render: Renderer2,
                public _elemRef: ElementRef) {
    }

    ngOnInit() {

        this.subscriptionActiveDropDown = this._overlayService.activeDropDown$

            .subscribe(
                (result) => {

                    this.options = result.data;

                    if (result === false) {

                        this.setToNullOpenedPopup();
                    }

                }
            );

        this.subscriptionSelectedOption = this._overlayService.selectedOption$

            .subscribe(
                (selected) => {

                    this.selected = selected;

                    this.setDropDownPosition();

                    this.label = selected['label'];

                }
            );

    }

    public chooseValue(key: 'string') {

        let select = this.selected['select'];

        let currentSelect = {
            'key': key,
            'select': select,
            'positions': this.selected['positions']
        };

        this._overlayService.selectOption(currentSelect);

        this.closeDropDown();

        this.subscriptionSelectedOption.unsubscribe();

    }

    ngOnDestroy() {

        this.subscriptionSelectedOption.unsubscribe();

        this.subscriptionActiveDropDown.unsubscribe();

    }

    public setDropDownPosition() {

        let dropDownWrap = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0],

            positions = this.selected['positions'];

        this.renderElement(dropDownWrap, positions);

        let label = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown__line')[0];

        if (label) {
            this.setLabelWidth(label, positions['l_width']);
        }


let addFunctiionElement = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown__add_function')[0];

        if (addFunctiionElement) {
            this.addFunctionUniqueScroll(addFunctiionElement, positions['maxHeight']);
        }  }

    public renderElement(dropDownWrap, positions) {

        this._render.setStyle(dropDownWrap, 'top', positions['top']);

        this._render.setStyle(dropDownWrap, 'left', positions['left']);

        this._render.setStyle(dropDownWrap, 'height', positions['height']);

        this._render.setStyle(dropDownWrap, 'width', positions['width']);

        this._render.setStyle(dropDownWrap, 'max-height', positions['maxHeight']);

        this.innerScrolableWrapRender(positions['maxHeight']);

    }

    public closeDropDown() {

        this.setToNullOpenedPopup();

        this._overlayService.closeDropDown();

    }

    public setToNullOpenedPopup() {

        let dropDownWrap = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown')[0],

            positions = this.selected['positions'];

        this._render.setStyle(dropDownWrap, 'height', '0px');

    }

    public setLabelWidth(label, width) {
        this._render.setStyle(label, 'width', width);
    }

    public addFunctionUniqueScroll(element, width) {
        this._render.setStyle(element, 'max-height', width);
    }public onFocus() {
        this._overlayService.onFocusSearchField.next(true);
    }

    public innerScrolableWrapRender(maxHeight: string) {

        let staticBlock, staticHeight, scrollableBlock, comboDropDownControlls;

        staticBlock = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown__wrap__static')[0];

        if (staticBlock) {

            staticHeight = staticBlock.getBoundingClientRect();

            scrollableBlock = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown__wrap__scrollable')[0];

            let numberMaxHeight, messure;

            if (maxHeight && maxHeight.indexOf('px') !== -1) {
                numberMaxHeight = maxHeight.replace('px', '');
                messure = 'px';
            } else if (maxHeight && maxHeight.indexOf('vh') !== -1) {
                numberMaxHeight = maxHeight.replace('vh', '');
                messure = 'vh';
            }

            comboDropDownControlls = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown_controlls')[0];

            if (comboDropDownControlls) {

                comboDropDownControlls = comboDropDownControlls.offsetHeight;

            } else {

                comboDropDownControlls = 0;

            }

            if (scrollableBlock) {

                if (messure === 'vh') {
                    numberMaxHeight = window.innerHeight;
                }

                let labelBLock = this._elemRef.nativeElement.getElementsByClassName('simple-dropdown_label')[0];

                    if (labelBLock) {
                        labelBLock = labelBLock.offsetHeight
                    } else {
                        labelBLock = 0;
                    }

                let maxHeightValue = +numberMaxHeight - staticHeight['height'] - comboDropDownControlls - labelBLock;

                if (maxHeightValue < 0) {
                    maxHeightValue = 0;
                }

                this._render.setStyle(scrollableBlock, 'max-height', (maxHeightValue) + 'px')

            }

        }

    }

}
