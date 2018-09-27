import {
  Input,
  OnDestroy
}                              from '@angular/core';
import { Subscription }        from 'rxjs/Subscription';

import { DataBindingService }  from '../../services/data.binding.service';

export class RowComponent implements OnDestroy {

  protected viewSizeSubscription: Subscription;
  protected searchSubscription: Subscription;

  @Input() public columns: Object;
  @Input() public data: Object;
  @Input() public language: string;

  public viewSize: number;
  public searchText: string;


  constructor ( protected dataBindingService: DataBindingService ) {

    this.subscribeViewSize();
    this.subscribeSearch();

  }


  private subscribeViewSize (): void {

    this.viewSizeSubscription = this.dataBindingService.viewSize.subscribe( viewSize => {
      this.viewSize = viewSize;
    } );

  }

  private subscribeSearch (): void {

    this.searchSubscription = this.dataBindingService.search.subscribe( searchText => {

      this.searchText = searchText;

    } );

  }

  protected unsubscribeAll (): void {

    this.viewSizeSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();

  }


  public ngOnDestroy (): void {

    this.unsubscribeAll();

  }

}
