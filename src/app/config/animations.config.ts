import {animate, state, style, transition, trigger} from '@angular/animations';

export const VisibilityChanged: Object = trigger('visibilityChanged', [
        transition('void => *',
            [
                style({opacity: 0}),
                animate('200ms', style({opacity: 1}))
            ]),
        transition('* => void',
            [
                style({opacity: 1}),
                animate('200ms', style({opacity: 0}))
            ])
]);

export const FlyInOut: Object = trigger('flyInOut', [
    state('in', style({opacity: 1, transform: 'translateX(0)'})),
    transition('void => *', [
        style({
            opacity: 0,
            transform: 'translateX(100%)'
        }),
        animate('0.2s ease-in')
    ]),
    transition('* => void', [
        animate('0.2s ease-in', style({
            opacity: 0,
            transform: 'translateX(100%)'
        }))
    ])
]);

export const FadeInOut: Object = trigger('FadeInOut', [
        state('*', style({position: 'relative'})),
        state('void', style({position: 'fixed'})),
        transition('void => *',
            [
                style({
                    opacity: 0,
                    width: 100 + '%'
                }),
                animate('200ms 200ms ease-in', style({opacity: 1}))
            ]),
        transition('* => void',
            [
                style({ opacity: 1,
                        width: 100 + '%'
                }),
                animate('200ms ease-out', style({opacity: 0}))
            ])
    ]);

export const SlideInLeft: Object = trigger( 'menuVisible', [
        transition( 'void => *', [
            style( { transform: 'translateX(-100%)' } ),
            animate( '500ms 150ms cubic-bezier(.22,.81,.01,.99)', style( { transform: 'translateX(0)'} ))
        ]),
        transition( '* => void', [
            style( { transform: 'translateX(0)' } ),
            animate( '300ms 150ms cubic-bezier(.22,.81,.01,.99)', style( { transform: 'translateX(-100%)' } ) )
        ])
    ]);

export const FadeIn: Object = trigger( 'fadeIn', [
        transition( 'void => *', [
            style( { opacity: 0 } ),
            animate( '300ms cubic-bezier(.22,.81,.01,.99)', style( {opacity: 1} ))
        ]),
        transition( '* => void', [
            style( { opacity: 1 } ),
            animate( '300ms cubic-bezier(.22,.81,.01,.99)', style( { opacity: 0 } ) )
        ])
    ]);

export const SlideDown: Object = trigger('shrinkOut', [
    state('in', style({height: '*'})),
    transition( 'void => *', [
        style( { height: 0 } ),
        animate('300ms cubic-bezier(.22,.81,.01,.99)', style({height: '*'}))
    ]),
    transition('* => void', [
        style({height: '*'}),
        animate('300ms cubic-bezier(.22,.81,.01,.99)', style({height: 0}))
    ])
]);

export const PopupScale: Object = trigger('popupScale', [

    transition('inactive => active', [
        style({
            transform: 'scale3d(.3, .3, .3)'
        }),
        animate('200ms ease-out', style({
            transform: 'scale3d(1, 1, 1)'
        }))
    ]),

]);

export const TabsAnimation: Object = trigger('tabsAnimation', [

  transition('void => *', [
    style({
      opacity: 0
    }),
    animate('200ms 250ms ease-out', style({
      opacity: 1
    }))
  ]),
  transition('* => void', [
    style({
      opacity: 1
    }),
    animate('200ms ease-out', style({
      opacity: 0
    }))
  ]),

]);
