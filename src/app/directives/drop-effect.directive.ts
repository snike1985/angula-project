import {
  Directive,
  ElementRef,
  HostListener,
  Input, OnInit,
  Renderer2
} from '@angular/core';


@Directive({
  selector: '[dropEffect]'
})
export class DropEffectDirective implements OnInit {

  @Input( 'dropEffect' ) color: string;
  private drop: any;



  @HostListener('click', ['$event']) onClick( $event ) {

    this.click( $event );

  }


  constructor( private renderer: Renderer2,
               private elementRef: ElementRef ) {}

  public ngOnInit(): void {

    this.addDrop();

  }

  private addDrop(): void {

    this.drop = this.renderer.createElement( 'span' );
    this.renderer.addClass( this.drop, 'drop' );
    this.renderer.setStyle( this.drop, 'background', this.color );
    this.renderer.appendChild( this.elementRef.nativeElement, this.drop );
  }

  private click( e: any ): void {

    let targetRect = e.target.getBoundingClientRect(),
        drop = this.drop,
        dropRect = drop.getBoundingClientRect(),
        max = 0, x = 0, y = 0;

    this.renderer.removeClass( this.drop, 'animated' );

    setTimeout( () => {

      if ( !dropRect.height && !dropRect.width ) {

        max = Math.max( targetRect.width, targetRect.height );

        this.renderer.setStyle( this.drop, 'width', `${ max }px` );
        this.renderer.setStyle( this.drop, 'height', `${ max }px` );
      }

      x = e.pageX - targetRect.left - max / 2;
      y = e.pageY - targetRect.top - max / 2;

      this.renderer.setStyle( this.drop, 'top', `${ y }px` );
      this.renderer.setStyle( this.drop, 'left', `${ x }px` );

      this.renderer.addClass( this.drop, 'animated' );

    } );
  }
}



