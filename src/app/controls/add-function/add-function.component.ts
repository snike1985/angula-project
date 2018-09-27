import { Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription }                                    from 'rxjs/Subscription';
import { OverlayService }                                  from '../../services/overlay.service';
import { DataBindingService }                              from '../../services/data.binding.service';
import { DropDown }                                        from '../../interfaces/dropdown';
import { AddFunctionSearchComponent }                      from '../overlay/add-function-search/add-function-search.component';

@Component({
  selector: 'add-function',
  templateUrl: './add-function.component.html',
  styleUrls: ['./add-function.component.scss']
})
export class AddFunctionComponent  implements OnInit, OnDestroy {

  @Input() public options: any;
  @Input() public label: string;
  @Input() public className: string;

  @Output() public deleteFunction = new EventEmitter;

  private subscriptionSelectedOption: Subscription;
  private subscriptionViewSize: Subscription;
  private contentScrollTopSubscription: Subscription;
  private subscriptionActiveDropDown: Subscription;

  private viewSize: number;
  private dropDown: any;
  private contentScrollTop: any;

  public controlName: string = 'addFunctions';
  public activeSelectName: string;


  constructor(
      private _elemRef: ElementRef,
      private _overlayService: OverlayService,
      private _dataBindingService: DataBindingService
  ) {}


  private calculateDropDownPositions(): Object {

    let labelWidth = this.getLabelWidth();

    let elementPosition = this._elemRef.nativeElement.getElementsByClassName('select-control')[0].getBoundingClientRect(),
      topPosition, leftPosition, width, height, maxHeight;

    if ( this.viewSize === 3 ) {
      topPosition = elementPosition.top  + elementPosition.height + 10 + 'px';
      leftPosition = elementPosition.left + 'px';
      width = elementPosition.width + 'px';
      height = 'auto';

      maxHeight = ( window.innerHeight - ( elementPosition.top  + elementPosition.height + 10 ) ) + 'px';

    } else {
      topPosition = '0';
      leftPosition = '0';
      width = '100%';
      height = '100vh';
      maxHeight = '';
    }

    labelWidth = labelWidth + 'px';

    return {
      'top' : topPosition,
      'left' : leftPosition,
      'width' : width,
      'height' : height,
      'l_width' : labelWidth,
      'maxHeight': maxHeight
    };

  }

  private deleteItem(value: number): void {

    this.deleteFunction.emit(value);

  }

  private getLabelWidth() {

    let label = this._elemRef.nativeElement.getElementsByClassName('select-control-label')[0].getBoundingClientRect();

    return label['width'];

  }

  private getOptionsObject(): Object {

    return {
      'key' : null,
      'select' : this.controlName,
      'positions' : this.calculateDropDownPositions(),
    };

  }

  private subscribeOnActiveDropDown() {

    this.subscriptionActiveDropDown = this._overlayService.activeDropDown$.subscribe(

      ( dropDown ) => {

        if ( !dropDown ) {

          this.activeSelectName = '';

        }

        this.dropDown = dropDown;

      }

    );

  }

  private subscribeOnContentScroll() {

    this.contentScrollTopSubscription = this._dataBindingService.contentScrollTop.subscribe(

      (contentScrollTop) => {

        this.contentScrollTop = contentScrollTop;

        this._overlayService.closeDropDown();

      }

    );

  }

  private subscribeOnSelectedOption() {

    this.subscriptionSelectedOption = this._overlayService.selectedOption$.subscribe(

        ( value ) => {

          if ( value && value['select'] === this.controlName ) {

            this.activeSelectName = value['select'];

            if ( value['key'] ) {

              this.deleteItem( value['key'] );

            }

          } else {

            this.activeSelectName = '';

          }

        }

    );

  }

  private subscribeOnViewSize() {

    this.subscriptionViewSize = this._dataBindingService.viewSize.subscribe(

        (viewSize) => {

          this.viewSize = viewSize;

        }

    );

  }

  private unSubscribeAll() {

    this.subscriptionSelectedOption.unsubscribe();

    this.subscriptionViewSize.unsubscribe();

    this.contentScrollTopSubscription.unsubscribe();

    this.subscriptionActiveDropDown.unsubscribe();

  }


  public ngOnDestroy() {

    this.unSubscribeAll();

  }

  public ngOnInit() {

    this.subscribeOnContentScroll();

    this.subscribeOnSelectedOption();

    this.subscribeOnViewSize();

    this.subscribeOnActiveDropDown();

  }

  public openDropDown( event ) {

    this._overlayService.dropDownOpen.next(true);

    if ( this.activeSelectName === this.controlName ) {

      this._overlayService.closeDropDown();

      this._overlayService.dropDownOpen.next(false);

    } else {

      event.stopPropagation();

      this._overlayService.selectOption( this.getOptionsObject() );

      this._overlayService.addDropDown(

          new DropDown( AddFunctionSearchComponent, this.options, [] )

      );


    }

  }

}
