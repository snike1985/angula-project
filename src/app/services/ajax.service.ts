import {
  Headers,
  Http,
  RequestOptions,
  Response,
  URLSearchParams
} from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { DataBindingService } from './data.binding.service';

import 'rxjs/add/observable/throw';

export class AjaxService {

  private headers: Headers = new Headers( {
    'Content-Type': 'application/json'
  } );

  protected token: string = null;
  protected requestConfig: Object = {};
  protected domain: string;


  constructor( protected http: Http,
    protected dataBindingService: DataBindingService ) {
    this.subscribeToken();
  }


  private createUpdate( url, body, options, method ): Observable<any> {

    return this.http[ method ]( url, body, options )
    .map( ( res ) => {
      return res || {};
    } )
    .catch( AjaxService.handleError );

  }

  private readDelete( url, options, method, body? ): Observable<any> {

    let params = new URLSearchParams();

    if ( body ) {

      for ( let key in body ) {

        params.set( key, body[ key ] );

      }

      options[ 'search' ] = params;

    }

    return this.http[ method ]( url, options )
    .map( ( res ) => {
      return res || {};
    } )
    .catch( AjaxService.handleError );

  }

  private subscribeToken(): void {

    this.dataBindingService.token.subscribe( token => {

      if ( token ) {

        this.token = token;
        this.headers.set( 'X-Auth-Token', token );

      }

    } );

  }


  protected static handleError( error: Response | any ) {

    let errMsg: string;
    let result = {};

    switch ( error.status ) {
      case 500 || error.status > 500:

        window.location.href = `http://${window.location.host}/server-error`;

        break;

    }

    if ( error instanceof Response ) {

      const body = error.json() || '';
      const err = body.error || JSON.stringify( body );

      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;

    } else {

      errMsg = error.message ? error.message : error.toString();

    }

    result[ 'status' ] = error.status;
    result[ 'message' ] = errMsg;

    return Observable.throw( result );
  }

  protected sendRequest( body: Object, type: string, id: string ): Observable<any> {

    let path = this.requestConfig[ type ][ 'url' ],
      method = this.requestConfig[ type ][ 'method' ],
      url = `${ this.domain }${ path }`,
      options = new RequestOptions( { headers: this.headers } );

    if ( id ) {
      let start = url.indexOf( '{' ),
        finish = url.indexOf( '}' ) + 1;

      url = `${ url.substring( 0, start ) }${ id }${ url.substr( finish ) }`;

    }

    if ( method === 'get' || method === 'delete' ) {

      return this.readDelete( url, options, method, body );

    } else {

      return this.createUpdate( url, body, options, method );

    }

  }


  public send( type: string, body?: Object, id?: string ): Observable<any> {

    return this.sendRequest( body, type, id );

  }

}
