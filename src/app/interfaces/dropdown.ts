import { Type } from '@angular/core';

export class DropDown {
    constructor(public component: Type<any>, public data: Type<any>, public selected: any ) {}
}
