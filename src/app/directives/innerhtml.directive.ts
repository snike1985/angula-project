import {Directive, ElementRef, Input, OnInit} from '@angular/core';

@Directive( { selector: '[innerHTML]'} )
export class InnerHtmlDirective implements OnInit {
    @Input( 'innerHTML' ) html: string;

    constructor(private el: ElementRef) {}

    public ngOnInit(): void {

        this.el.nativeElement.innerHTML = this.html;

    }

}
