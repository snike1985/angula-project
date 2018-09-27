import {
  OnDestroy,
  Input
}                              from '@angular/core';
import { FormControl }         from '@angular/forms';

import { DataBindingService }  from '../../services/data.binding.service';

import { Subscription }        from 'rxjs/Subscription';
import { Subject } from 'rxjs/Subject';


export class SearchComponent implements OnDestroy {

  @Input() public placeholderText: string;

  private searchDataSubscription: Subscription;
  private dataSubscription: Subscription;
  private myPush: boolean = false;
  private data: Subject<string> = new Subject();

  public fc: FormControl;
  public isEmptyInput: boolean = false;
  public searchData: string;


  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: any ) {

    this.subscribeSearchData();
    this.subscribeData();

  }


  private subscribeData(): void {

    this.dataSubscription = this.data
    .debounceTime(600)
    .subscribe( data => {

      this.itemsService.setSearchData( data );
      this.dataBindingService.search.next( data );

    } );

  }

  private subscribeSearchData(): void {

    this.searchDataSubscription = this.itemsService.requestDataSubject.subscribe( ( data ) => {

      if ( !this.myPush ) {

        this.searchData = data[ 'searchData' ];

        if ( !this.fc ) {

          this.createControl();

        } else {

          this.updateControl();

        }

      } else {
        this.myPush = false;

      }

    } );

  }

  private createControl(): void {

    this.fc = new FormControl( this.searchData );

  }

  private updateControl(): void {

    this.fc.setValue( this.searchData );

  }


  public changeVal(): void {

    let val = this.fc.value;

    this.myPush = true;
    this.data.next( val );
    this.isEmptyInput = val !== '';

  }

  public reset() {
    this.fc.setValue( '' );
    this.changeVal();
  }

  public ngOnDestroy(): void {

    this.searchDataSubscription.unsubscribe();
    this.dataBindingService.search.next( '' );

  }

}
