import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { ReactiveFormsModule}       from '@angular/forms';
import { ActiveEffectModule }       from '../../../../modules/active-effect.module';
import { EditProfileRoutingModule } from './edit-profile-routing.module';
import { SelectcontrolModule }      from '../../../../controls/selectcontrol/selectcontrol.module';
import { DropEfectGlobalModule }    from '../../../../modules/drop-efect-global.module';
import { PerfectScrollbarModule }   from 'ngx-perfect-scrollbar';

import { EditProfileComponent }     from './edit-profile.component';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    PerfectScrollbarModule,
    SelectcontrolModule,
    EditProfileRoutingModule
  ],
  declarations: [
    EditProfileComponent
  ]
})
export class EditProfileModule { }
