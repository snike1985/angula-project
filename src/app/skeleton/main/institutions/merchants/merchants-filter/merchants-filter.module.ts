import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';
import { KeysPipeModule }               from '../../../../../modules/keys-pipe.module';
import { DropEfectGlobalModule }        from '../../../../../modules/drop-efect-global.module';
import { ActiveEffectModule }           from '../../../../../modules/active-effect.module';
import { SelectcontrolModule }          from '../../../../../controls/selectcontrol/selectcontrol.module';

import { MerchantsFilterComponent }     from './merchants-filter.component';
import { FilterModule } from '../../../../../modules/filter.module';

@NgModule({
  imports: [
    FilterModule
  ],
  declarations: [
    MerchantsFilterComponent
  ],
  exports: [
    MerchantsFilterComponent
  ]
})
export class MerchantsFilterModule { }
