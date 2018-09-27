import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';

@Directive({
  selector: '[highlight]'
})
export class HighlightDirective implements OnInit {

  @Input( 'highlight' ) private search: string;
  @Input() private color: string;
  @Input() private content: string;

  private resultArr: string[];


  constructor( private el: ElementRef, private renderer: Renderer2 ) { }


  private setContent(): void {

    let strLength = 0;

    for ( let i = 0; i < this.resultArr.length; i++ ) {

      let curPatern = this.resultArr[ i ],
          curText = this.content.substr( strLength, curPatern.length );

      if ( i ) {

        let wrapper = this.renderer.createElement( 'i' );

        this.renderer.appendChild( wrapper, this.renderer.createText( this.content.substr( ( strLength - this.search.length ), this.search.length ) ) );

        this.renderer.setStyle( wrapper, 'background', this.color );
        this.renderer.setStyle( wrapper, 'font-style', 'normal' );

        this.renderer.appendChild( this.el.nativeElement, wrapper );

      }

      this.renderer.appendChild( this.el.nativeElement, this.renderer.createText( curText ) );

      strLength += ( curPatern.length + this.search.length );

    }

  }

  private checkContent(): void {


    let str = this.content.toLowerCase(),
        subStr = this.search.toLowerCase();

    this.resultArr = str.split( subStr );

  }


  public ngOnInit(): void {

    this.checkContent();
    this.setContent();

  }



}
