import {
  ElementRef,
  HostListener,
  OnInit,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { ContentCommonComponent } from '../content-common/content-common.component';

import { DataBindingService } from '../../services/data.binding.service';
import { NotificationService } from '../../services/notification.service';

import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import { SelectOptions } from '../../interfaces/select-options';

export class FilterTableComponent extends ContentCommonComponent implements OnInit {

  @HostListener( 'window:scroll', [ '$event' ] )
  private onScroll( event: any ): void {

    this.scrollPos = event.target.body.scrollTop;
    this.checkNextPage();

  };

  private getRequestData: Object = {};
  private pageNo: number = 1;
  private totalPages: number;
  private canLoad: boolean = false;
  private scrollPos: number;

  protected tableDataSubscription: Subscription;
  protected requestDataSubscription: Subscription;
  protected config: Object;
  protected listName: string;
  protected scrollSubscription: Subscription;

  public texts: Object;
  public tableConf: Object[];
  public tableData: Object[];
  public requestData: Object;
  public loading: boolean = true;
  public empty: boolean = false;
  public filterConf: Object;
  public totalRecords: number = 1;
  public totalFilteredRecords: number = 0;
  public totalStr: string = '';


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: any,
    protected notificationService: NotificationService,
    protected elemHref: ElementRef,
    protected renderer: Renderer2 ) {

    super( dataBindingService, elemHref, renderer );

    this.subscribeView();
    this.subscribeScroll();
    this.subscribeTableData();
    this.subscribeRequestData();

  }


  private checkNextPage(): void {

    if ( this.canLoad ) {

      let windowBox = this.elemHref.nativeElement.getBoundingClientRect(),
        loaderBox = null;

      if ( document.getElementsByClassName( 'spinner_inner' ).length ) {

        loaderBox = document.getElementsByClassName( 'spinner_inner' )[ 0 ].getBoundingClientRect();

        if ( loaderBox[ 'top' ] < windowBox[ 'height' ] ) {

          this.canLoad = false;

          this.uploadNextPage();

        }

      }


    }

  }

  private getTotalStr(): void {

    if ( this.totalRecords === this.totalFilteredRecords ) {

      this.totalStr = `${ this.totalRecords } ${ this.texts[ 'total' ] }`;

    } else {

      this.totalStr = `${ this.totalFilteredRecords } ${ this.texts[ 'subTotal' ][ 0 ] } ${ this.totalRecords } ${ this.texts[ 'subTotal' ][ 1 ] }`;

    }

  }

  private subscribeRequestData(): void {

    this.requestDataSubscription = this.itemsService.requestDataSubject.subscribe( ( data ) => {

      if ( !( this.tableData.length && !this.requestData ) ) {

        this.pageNo = 1;


        this.requestData = data;

        this.updateItems();

      } else {

        this.requestData = data;

      }


    } );

  }

  private subscribeScroll(): void {

    this.scrollSubscription = this.dataBindingService.contentScrollTop.subscribe( ( scrollTop: number ) => {

      this.scrollPos = scrollTop;
      this.checkNextPage();

    } );

  }

  private subscribeTableData(): void {

    this.tableDataSubscription = this.itemsService.itemsList.subscribe( ( data ) => {

      this.tableData = this.adaptData( data );

    } );

  }

  private updateGetRequestData(): void {

    this.getRequestData[ 'sort-column' ] = this.requestData[ 'orderData' ][ 'name' ];

    if ( this.requestData[ 'orderData' ][ 'direction' ] ) {

      this.getRequestData[ 'sort-order' ] = 'des';

    } else {

      this.getRequestData[ 'sort-order' ] = 'asc';

    }

    delete this.getRequestData[ 'search' ];

    if ( this.requestData[ 'searchData' ] !== '' ) {

      this.getRequestData[ 'search' ] = this.requestData[ 'searchData' ];

    }

    delete this.getRequestData[ 'filters' ];

    for ( let key in this.requestData[ 'filterData' ] ) {

      if ( this.requestData[ 'filterData' ][ key ] !== '-1' ) {

        if ( !this.getRequestData[ 'filters' ] ) {

          this.getRequestData[ 'filters' ] = `${ key }:${ this.requestData[ 'filterData' ][ key ] }`;

        } else {

          this.getRequestData[ 'filters' ] += `,${ key }:${ this.requestData[ 'filterData' ][ key ] }`;

        }

      }

    }

  }

  private updateItems(): void {

    this.tableData = [];

    this.itemsService.itemsList.next( this.tableData );

    this.updateGetRequestData();

    this.loading = true;
    this.empty = false;

    this.getRequestData[ 'page-no' ] = this.pageNo;
    this.getRequestData[ 'page-size' ] = this.globalSettings[ 'settingDto' ][ 'pagination' ];

    this.itemsService.send( 'getData', this.getRequestData )
        .subscribe(
          res => {
            let dataJson = res.json();

            if ( dataJson[ 'status' ] === 'failure' ) {

              this.notificationService.errorNotify( dataJson[ 'message' ] );

            } else {

              let data = dataJson[ 'data' ];

              if ( !data[ this.listName ].length ) {

                this.loading = false;
                this.totalRecords = +data[ 'total-record' ];
                this.totalFilteredRecords = +data[ 'total-filtered-record' ];

                this.getTotalStr();

                this.empty = true;

              } else {

                this.pageNo = +data[ 'page-no' ];
                this.totalRecords = +data[ 'total-record' ];
                this.totalFilteredRecords = +data[ 'total-filtered-record' ];

                this.getTotalStr();

                this.totalPages = Math.ceil( this.totalFilteredRecords / this.getRequestData[ 'page-size' ] );

                if ( this.pageNo < this.totalPages ) {

                  this.canLoad = true;
                  this.loading = true;

                } else {

                  this.canLoad = false;
                  this.loading = false;

                }

                data[ this.listName ] = this.adaptData( data[ this.listName ] );

                this.itemsService.itemsList.next( data[ this.listName ] );

              }

            }

          } );

  }

  private uploadNextPage(): void {

    this.getRequestData[ 'page-no' ] = ++this.pageNo;

    this.loading = true;

    this.itemsService.send( 'getData', this.getRequestData )
        .subscribe(
          res => {

            let dataJson = res.json();

            if ( dataJson[ 'status' ] === 'failure' ) {

              this.notificationService.errorNotify( dataJson[ 'message' ] );

            } else {

              let data = dataJson[ 'data' ];

              this.pageNo = +data[ 'page-no' ];
              this.totalRecords = +data[ 'total-record' ];
              this.totalFilteredRecords = +data[ 'total-filtered-record' ];

              this.getTotalStr();

              this.totalPages = Math.ceil( this.totalFilteredRecords / this.getRequestData[ 'page-size' ] );

              if ( this.pageNo < this.totalPages ) {
                this.canLoad = true;
                this.loading = true;
              } else {
                this.canLoad = false;
                this.loading = false;
              }

              data[ this.listName ] = this.adaptData( data[ this.listName ] );

              this.tableData = this.tableData.concat( data[ this.listName ] );

              this.itemsService.itemsList.next( this.tableData );

            }

          } );

  }


  protected adaptData( data: Object[] ): Object[] {

    return data;

  }

  protected checkFilterComplete(): void {

    let completed = true;

    for ( let key in this.config[ 'filter' ] ) {

      let item = this.config[ 'filter' ][ key ];

      if ( !item[ 'completed' ] ) {

        completed = false;

        break;

      }

    }


    if ( completed ) {

      this.filterConf = this.config[ 'filter' ];

      this.hideSpinner();

    }

  }

  protected clearAllItems(): void {
    this.itemsService.itemsList.next( [] );
  }

  protected getFilterData(): void {

    this.setFilterLanguage();

    this.checkFilterComplete();

  }

  protected getStartData(): void {

    this.texts = this.config[ 'texts' ][ this.language ];

    this.tableConf = this.config[ 'table' ];

  }

  protected setFilterLanguage(): void {

    for ( let key in this.config[ 'filter' ] ) {

      let item = this.config[ 'filter' ][ key ];

      if ( item[ 'options' ] ) {

        for ( let option of item[ 'options' ] ) {

          if ( !option[ 'options' ] ) {

            if ( option.text[ this.language ] ) {

              option.text = option.text[ this.language ];

            }

          } else {

            for ( let option_inner of option[ 'options' ] ) {

              if ( option_inner.text[ this.language ] ) {

                option_inner.text = option_inner.text[ this.language ];

              }

            }

          }


        }

      }

    }

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

  }

  protected updateFilter( name: string, options: SelectOptions[] ): void {

    let itemsFilter = this.config[ 'filter' ][ name ];

    if ( !itemsFilter[ 'completed' ] ) {

      itemsFilter[ 'options' ] = itemsFilter[ 'options' ].concat( options );

      itemsFilter[ 'completed' ] = true;

    }

    this.checkFilterComplete();

  }


  public ngOnInit(): void {

    this.getStartData();

    this.getFilterData();

  }

  public setCurrentToNull(): void {

    this.itemsService.currentItem.next( null );

  }

}
