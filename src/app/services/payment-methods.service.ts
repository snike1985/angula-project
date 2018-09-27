import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { SelectOptions } from '../interfaces/select-options';
import { NotificationService } from './notification.service';
import { PaymentMethodsRequests } from '../config/requests.config';
import { AjaxService } from './ajax.service';
import { Http } from '@angular/http';
import { DataBindingService } from './data.binding.service';

@Injectable()
export class PaymentMethodsService extends AjaxService {

  protected requestConfig: Object = PaymentMethodsRequests;

  public paymentMethodOptions: BehaviorSubject<Object[]> = new BehaviorSubject( [] );

  constructor( protected http: Http,
    protected dataBindingService: DataBindingService,
    private notificationService: NotificationService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

  }

  public getMethods(): void {

    this.send( 'getOptions' )
        .subscribe( res => {

          let dataJson = res.json();

          if ( dataJson[ 'status' ] === 'failure' ) {

            this.notificationService.errorNotify( dataJson[ 'message' ] );

          } else {

            let data = dataJson[ 'data' ];

            this.paymentMethodOptions.next( data );

          }

        } );

  }


}
