import { NgModule }                         from '@angular/core';

import { ActiveEffectDirective }            from '../directives/active-effect.directive';


@NgModule({
    declarations: [
        ActiveEffectDirective
    ],
    exports: [
        ActiveEffectDirective,
    ]
})
export class ActiveEffectModule { }
