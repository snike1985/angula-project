import {
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  FormControl,
  FormGroup
} from '@angular/forms';
import { Subscription } from 'rxjs/Subscription';

import { DataBindingService } from '../../../services/data.binding.service';
import { OverlayService } from '../../../services/overlay.service';
import { DatePipe } from '@angular/common';


export class FilterComponent implements OnInit, OnDestroy {

  @Input() public lang: string;
  @Input() public totalString: string = '';
  @Input() public filterConf: Object = {};
  @Input() public viewSize: number;
  @Input() public className: string = '';
  @Input() public modifClass: boolean = false;

  private valuesSubscription: Subscription;
  private myPush: boolean = false;
  private filterDataSubscription: Subscription;

  public fg: FormGroup;
  public selected: Object[] = [];
  public menuVisible: boolean = false;
  public filterData: Object;
  public texts: Object;


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: any,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe ) {
  }


  private createFormGroup(): void {

    let controls = {};

    for ( let key in this.filterData ) {

      controls[ key ] = new FormControl( this.filterData[ key ] );

    }

    this.fg = new FormGroup( controls );

    this.subscribeValues();

  }

  protected getAmountString( amount ): string {

    return '';

  }

  private getControlData( name: string, value: string ): Object {

    let result = {},
      item = this.filterConf[ name ],
      option;

    if ( item[ 'options' ] ) {

      for ( let element of item[ 'options' ] ) {

        let values = [ value ];


        if ( name !== 'addresses' ) {
          values = value.split( ',' );
        }

        for ( let val of values ) {

          if ( `${ element[ 'value' ] }` === `${ val }` ) {

            if ( option ) {

              option += `, ${ element[ 'text' ] }`;

            } else {

              option = element[ 'text' ];

            }

            break;

          }
        }


      }
      result[ 'value' ] = option;

    }

    if ( name === 'period' ) {
      let dates = this.fg.controls[ name ].value.split( ',' ),
        firstDate = this.datePipe.transform( (+dates[ 0 ] * 1000 ), 'dd MMM yyyy' ),
        lastDate = this.datePipe.transform( (+dates[ 1 ] * 1000 ), 'dd MMM yyyy' );

      result[ 'value' ] = `${ firstDate } - ${ lastDate }`;
    }

    if ( name === 'forReview' ) {

      result[ 'value' ] = this.fg.controls[ name ].value;

    }


    result[ 'label' ] = item[ 'title' ][ this.lang ];
    result[ 'name' ] = name;

    return result;

  }

  private subscribeValues(): void {

    this.valuesSubscription = this.fg.valueChanges.subscribe( ( data ) => {

      this.updateSelected();

      this.myPush = true;


      if ( data[ 'forReview' ] === false ) {

        delete data[ 'forReview' ];

      }

      if ( data[ 'amount' ] ) {

        if ( data[ 'amount' ][ 'approved' ] ) {

          data[ 'approved' ] = this.getAmountString( data[ 'amount' ][ 'approved' ] );

        }

        if ( data[ 'amount' ][ 'requested' ] ) {

          data[ 'requested' ] = this.getAmountString( data[ 'amount' ][ 'requested' ] );

        }

        delete data[ 'amount' ];

      }

      this.itemsService.setFilterData( data );

    } );

  }

  private unsubscribeAll(): void {

    this.filterDataSubscription.unsubscribe();
    this.valuesSubscription.unsubscribe();

  }

  private updateFormValues(): void {

    for ( let key in this.filterData ) {

      this.fg.controls[ key ].setValue( this.filterData[ key ] );

    }

  }

  private updateSelected(): void {

    this.selected = [];

    for ( let controlKey in this.fg.controls ) {

      if ( this.fg.controls[ controlKey ].value !== '-1' ) {

        if ( controlKey === 'amount' ) {

          let data = this.fg.controls[ controlKey ].value;

          if ( data[ 'requested' ] ) {

            this.selected.push( {
              name: 'requested',
              value: this.getAmountString( data[ 'requested' ] ),
              label: this.texts[ 'labels' ][ 'requested' ]
            } );

          }

          if ( data[ 'approved' ] ) {

            this.selected.push( {
              name: 'approved',
              value: this.getAmountString( data[ 'approved' ] ),
              label: this.texts[ 'labels' ][ 'approved' ]
            } );

          }

        } else {

          let selectedData = this.getControlData( controlKey, `${ this.fg.controls[ controlKey ].value }` );

          this.selected.push( selectedData );

        }

      }

    }

  }


  protected subscribeFilterData(): void {

    this.filterDataSubscription = this.itemsService.requestDataSubject.subscribe( ( data ) => {

      if ( !this.myPush ) {

        if ( JSON.stringify( this.filterData ) !== JSON.stringify( data[ 'filterData' ] ) ) {

          this.filterData = data[ 'filterData' ];

          if ( !this.fg ) {

            this.createFormGroup();

          } else {

            this.updateFormValues();

          }

        }

      } else {

        this.myPush = false;

      }

    } );

  }


  public ngOnDestroy(): void {

    this.unsubscribeAll();

  }

  public ngOnInit(): void {

    this.subscribeFilterData();

  }

  public itemsCount( object ): number {

    return Object.keys( object ).length;

  }

  public resetAll() {

    for ( let controlKey in this.fg.controls ) {

      if ( controlKey === 'forReview' ) {

        this.fg.controls[ controlKey ].setValue( false );

      } else {

        this.fg.controls[ controlKey ].setValue( '-1' );

      }

    }

  }

  public resetItem( item ) {

    if ( item[ 'name' ] === 'forReview' ) {

      this.fg.controls[ item[ 'name' ] ].setValue( false );

    } else if ( item[ 'name' ] === 'requested' ) {

      let amountValue = this.fg.controls[ 'amount' ].value;
      delete amountValue[ 'requested' ];

      if ( amountValue[ 'approved' ] ) {

        this.fg.controls[ 'amount' ].setValue( amountValue );

      } else {

        this.fg.controls[ 'amount' ].setValue( '-1' );

      }


    } else if ( item[ 'name' ] === 'approved' ) {

      let amountValue = this.fg.controls[ 'amount' ].value;
      delete amountValue[ 'approved' ];
      this.fg.controls[ 'amount' ].setValue( amountValue );


    } else {

      this.fg.controls[ item[ 'name' ] ].setValue( '-1' );

    }

  }

  public togglePopup() {

    this.menuVisible = !this.menuVisible;

    this.setHtmlOverflow( this.menuVisible );

  }

  public setHtmlOverflow( state: boolean ) {

    this.overlayService.openedMobileFiltersWrap.next( state );

    this.overlayService.setOverflowOverlay( state );

  }

}
