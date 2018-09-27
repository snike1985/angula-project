import { AfterViewInit, Component, OnInit }       from '@angular/core';
import { SimpleDropdownComponent } from '../simpledropdown/simpledropdown.component';


@Component({
  selector: 'simple-search-dropdown',
  templateUrl: './simple-search-dropdown.component.html',
  styleUrls: ['./simple-search-dropdown.component.scss'],
})

export class SimpleSearchDropdownComponent extends SimpleDropdownComponent implements OnInit, AfterViewInit {

  public overLayClass: string;

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

  public selected: object;

  public label: string = '';

  public anyControlText;

  public test: string = '';

  public onKeyUp(event): void {

    this.test = event.target.value;

    this.searchTerm = event.target.value;

  }

  public isSetglobalValue: boolean = false;

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



              this.label = selected['label'];

              this.overLayClass = selected['dropDownClass'];

            }
        );

        this.checkGlobalValue();

  }

  public checkGlobalValue() {

      if ( this.options[0]['value'] === '-1' ) {

          this.isSetglobalValue = true;

          this.anyControlText = this.options[0]['text'];

      }

  }

  ngAfterViewInit() {
      this.setDropDownPosition();
  }

}
