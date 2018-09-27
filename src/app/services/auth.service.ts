import { Http }                     from '@angular/http';
import { Injectable }               from '@angular/core';

import { AjaxService }              from './ajax.service';
import { DataBindingService }       from './data.binding.service';

import { AuthRequests }             from '../config/requests.config';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';


@Injectable()
export class AuthService extends AjaxService {

  protected requestConfig: Object = AuthRequests;

  constructor( protected http: Http, protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

  }

}
