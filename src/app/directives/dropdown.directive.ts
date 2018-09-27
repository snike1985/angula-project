import {Directive, ViewContainerRef} from '@angular/core';

@Directive({
  selector: '[dropdown]'
})
export class DropdownDirective {

  constructor( public viewContainerRef: ViewContainerRef ) { }

}
