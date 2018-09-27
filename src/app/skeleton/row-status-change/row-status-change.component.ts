import { OnInit }                from '@angular/core';
import { FormControl }           from '@angular/forms';
import { Subscription }          from 'rxjs/Subscription';

import { RowComponent }          from '../row/row.component';

import { NotificationService }   from '../../services/notification.service';
import { DataBindingService }    from '../../services/data.binding.service';

export class RowStatusChangeComponent extends RowComponent implements OnInit {


  protected controlSubscribe: Subscription;
  protected prevStatus: boolean;
  protected statusValue: boolean;

  public fc: FormControl;


  constructor( protected dataBindingService: DataBindingService,
               protected rowStatusService: any,
               protected notification: NotificationService ) {

    super( dataBindingService );

  }

  protected createFormControl() {

    this.fc = new FormControl( this.data[ 'active' ] );

    this.prevStatus = this.data[ 'active' ];

    this.subscribeValueChanges();
  }

  protected subscribeValueChanges() {

    this.controlSubscribe = this.fc.valueChanges.subscribe( status => {

      this.statusValue = status;

      this.update();

    } );

  }

  protected unsubscribeAll(): void {

    this.viewSizeSubscription.unsubscribe();
    this.searchSubscription.unsubscribe();
    this.controlSubscribe.unsubscribe();

  }

  protected update(): void {

    this.data[ 'active' ] = this.fc.value;

    this.rowStatusService.send( 'update', this.data, this.data[ 'id' ] )
    .subscribe(
      res => {

        let dataJson = res.json();

        if ( dataJson[ 'status' ] === 'failure' ) {

          this.fc.setValue( this.prevStatus );

          this.notification.errorNotify( `${ dataJson[ 'message' ] }` );

        }

      } );
  };


  public ngOnInit(): void {

    this.createFormControl();

  }

}
