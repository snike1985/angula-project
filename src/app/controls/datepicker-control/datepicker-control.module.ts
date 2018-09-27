import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';
import { DatepickerControlComponent } from './datepicker-control.component';
import { DropEfectGlobalModule } from '../../modules/drop-efect-global.module';


@NgModule({
    imports: [
        CommonModule,
        DropEfectGlobalModule
    ],
    declarations: [
      DatepickerControlComponent,
    ],
    exports: [
        DatepickerControlComponent
    ]
})

export class DatepickerControlModule { }
