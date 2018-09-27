import { Directive, ElementRef, OnDestroy }     from '@angular/core';
import { Subscription }                         from 'rxjs/Subscription';
import { Observable }                           from 'rxjs/Rx';


import { DatePipe }                             from '@angular/common';

import 'rxjs/add/observable/interval';

@Directive({
  selector: '[time]'
})
export class TimeDirective implements OnDestroy{

  private currentTime: Observable<number>;

  private subscription: Subscription;

  constructor(
      private el: ElementRef,
      private datePipe: DatePipe
  ) {

      this.createTimeObservable();

      this.timeSubscribe();

  }

  private createTimeObservable(): void {

    this.currentTime = Observable
        .interval(1000)
        .startWith(0)
        .map(
            value => Date.now()
        );

  }

  private timeSubscribe () {

       this.subscription =  this.currentTime.subscribe(
          time => this.el.nativeElement.innerText = this.datePipe.transform( time, 'HH:mm:ss dd MMMM' )
      );

  }

  public ngOnDestroy(): void {

      if ( !this.subscription.closed ) {

          this.subscription.unsubscribe();

      }

  }

}
