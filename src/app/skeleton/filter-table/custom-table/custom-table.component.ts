import {
  AfterViewInit,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  Renderer2,
  ViewChild
}                             from '@angular/core';
import { Subscription }       from 'rxjs/Subscription';

import { SpinnerComponent }   from '../../spinner/spinner.component';

import { DataBindingService } from '../../../services/data.binding.service';

export class CustomTableComponent extends SpinnerComponent implements AfterViewInit, OnDestroy {

  private stickHeadEl: ElementRef;

  @ViewChild( 'stickHead' )
  private set stickHead( el: ElementRef ) {

    this.stickHeadEl = el;

  };

  @Input() public tableConf: Object[];
  @Input() public texts: Object[];
  @Input() public loading: boolean;
  @Input() public empty: boolean;
  @Input() public viewSize: number;
  @Input() public language: number;
  @Input() public componentName: string;
  @Input() public tableData: Object[];

  private curPosition: number;
  private myPush: boolean = false;
  private orderData: Object;

  protected contentScrollTop: any;
  protected scrollTopSubscription: Subscription;
  protected orderDataSubscription: Subscription;


  constructor( protected dataBindingService: DataBindingService,
               protected itemsService: any,
               protected renderer: Renderer2 ) {

    super();

    this.subscribeOrderData();

  }


  private checkScroll(): void {

    if ( this.stickHeadEl && this.contentScrollTop >= 0 ) {

      let tableHead = this.stickHeadEl.nativeElement;

      this.getTopPosition();

      if ( this.curPosition > 0 ) {

        this.renderer.removeClass( tableHead, 'fixed' );

      } else if ( this.curPosition <= 0 ) {

        this.renderer.addClass( tableHead, 'fixed' );

      }

    }

  }

  private getTopPosition(): void {

    if ( this.stickHeadEl ) {

      this.curPosition = this.stickHeadEl.nativeElement.getBoundingClientRect().top;

    }

  }

  private subscribeScrollTop(): void {

    if ( this.viewSize >= 3 ) {

      this.scrollTopSubscription = this.dataBindingService.contentScrollTop.subscribe( ( contentScrollTop ) => {

        this.contentScrollTop = contentScrollTop;

        this.checkScroll();

      } );

    }
  }

  private subscribeOrderData(): void {

    this.orderDataSubscription = this.itemsService.requestDataSubject.subscribe( data => {

      if ( !this.myPush ) {


        this.orderData = data[ 'orderData' ];


      } else {

        this.myPush = false;

      }

    } );

  }


  protected unsubscribeAll(): void {

    if ( this.contentScrollTop ) {

      this.scrollTopSubscription.unsubscribe();

    }

    this.orderDataSubscription.unsubscribe();

  }


  public checkDownClass( column: Object ): boolean {

    return ( column[ 'orderName' ] === this.orderData[ 'name' ] ) && ( this.orderData[ 'direction' ] === 0 );

  }

  public checkUpClass( column: Object ): boolean {

    return ( column[ 'orderName' ] === this.orderData[ 'name' ] ) && ( this.orderData[ 'direction' ] === 1 );

  }

  public order( column ): void {

    if ( column[ 'orderName' ] ) {

      if ( column[ 'orderName' ] === this.orderData[ 'name' ] ) {

        this.orderData[ 'direction' ] = Math.abs( this.orderData[ 'direction' ] - 1 );

      } else {

        this.orderData[ 'name' ] = column[ 'orderName' ];
        this.orderData[ 'direction' ] = 0;

      }

      this.myPush = true;

      this.itemsService.setOrderData( this.orderData );

    }

  }

  public ngAfterViewInit(): void {

    this.subscribeScrollTop();


  }

  public ngOnDestroy(): void {

    this.unsubscribeAll();

  }

}
