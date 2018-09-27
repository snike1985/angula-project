import {
  Pipe,
  PipeTransform
} from '@angular/core';

@Pipe( {
  name: 'review',
  pure: false
} )
export class ReviewPipe implements PipeTransform {

  transform( value: any, args: any[] = null ): any {

    if ( value[ 'name' ] === 'forReview' && !value[ 'value' ] ) {
      return false;
    }

    return value.filter( item => {

      if ( item[ 'name' ] === 'forReview' && !item[ 'value' ] ) {
        return false;
      }

      return true;

    } );

  }

}
