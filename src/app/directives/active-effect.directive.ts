import {
  Directive,
  ElementRef,
  HostListener,
  Input, OnInit,
  Renderer2
} from '@angular/core';

@Directive({
  selector: '[activeEffect]'
})
export class ActiveEffectDirective implements OnInit {

  @Input( 'activeEffect' ) className: string;
  private activeEffect: any;
  private curElem = this.elementRef.nativeElement;


  @HostListener('click', ['$event']) onClick( $event ) {

    this.click( $event );

  }

  constructor( private renderer: Renderer2,
               private elementRef: ElementRef ) {}

  public ngOnInit(): void {

    this.addActiveEffect();

  }

  private addActiveEffect(): void {

    this.renderer.addClass( this.curElem, 'link-effect' );
    this.renderer.addClass( this.curElem, `link-effect_${ this.className }` );

  }

  private click( e: any ): void {

    let text = e.target.innerText;

    this.renderer.removeClass( this.curElem, 'animated' );
    this.renderer.setAttribute( this.curElem, 'data-text', `${text}`);

    setTimeout( () => {

      this.renderer.addClass( this.curElem, 'animated' );

    } );
  }
}



