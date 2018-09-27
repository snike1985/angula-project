import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe( {
  name: 'numberFormatPipe',
  pure: false
} )
export class NumberFormatPipe implements PipeTransform {

  transform( value: any, args: any[] = null ): any {

    let result = '',
      counter = 0;

    for ( let i = value.length - 1; i >= 0; i-- ) {

      counter++;

      result = value[ i ] + result;

      if ( counter === 3 ) {

        counter = 0;

        result = ' ' + result;

      }

    }

    return result;

  }

}
