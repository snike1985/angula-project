import { Http }                             from '@angular/http';
import { Injectable }                       from '@angular/core';

import { AjaxService }                      from '../../ajax.service';
import { DataBindingService }               from '../../data.binding.service';

import { ViewingSettingsRequests }          from '../../../config/requests.config';


import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class ViewingSettingsService extends AjaxService {

  protected requestConfig: Object = ViewingSettingsRequests;

  constructor( protected http: Http, protected dataBindingService: DataBindingService ) {

    super( http, dataBindingService );

    this.domain = this.requestConfig[ 'domain' ];

  }

}
