import { NgModule }         from '@angular/core';

import { TimeDirective }    from '../directives/time.directive';
import { DatePipe }         from '@angular/common';

@NgModule({
    declarations: [
        TimeDirective
    ],
    providers: [
        DatePipe
    ],
    exports: [
        TimeDirective,
    ]
})
export class TimeModule { }
