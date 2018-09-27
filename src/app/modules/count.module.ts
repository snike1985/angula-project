import { NgModule }                     from '@angular/core';

import { CountoDirective }              from '../directives/counto.directive';

@NgModule({
    declarations: [ CountoDirective ],
    exports: [ CountoDirective ]
})
export class CountModule {}
