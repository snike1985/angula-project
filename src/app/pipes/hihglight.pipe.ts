import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hihglight'
})

export class HighlightPipe implements PipeTransform {

  private resultArr: string[];

  transform(value: any, searchTerm): any {

    if (searchTerm) {

      this.checkContent( value, searchTerm );

      return this.setContent( value, searchTerm );

    } else {

      return value;

    }

  }

  private setContent( value, searchTerm ): string {

    let strLength = 0,
    result: string = '';

    for ( let i = 0; i < this.resultArr.length; i++ ) {

      let curPatern = this.resultArr[ i ],
          curText = value.substr( strLength, curPatern.length );

      if ( i ) {

        result += `<span class="highlight">${value.substr( ( strLength - searchTerm.length ), searchTerm.length )}</span>`;

      }

      result += curText;

      strLength += ( curPatern.length + searchTerm.length );

    }
    return result;

  }

  private checkContent(value, search): void {

    let str = value.toLowerCase(),
        subStr = search.toLowerCase();

    this.resultArr = str.split( subStr );

  }

}
