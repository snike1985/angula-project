import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { DevicesRoutingModule }       from './devices-routing.module';

import { DevicesComponent }           from './devices.component';

import { DevicesRequestsService }     from '../../../../services/main/institutions/devices-requests.service';

@NgModule({
  imports: [
    CommonModule,
    DevicesRoutingModule
  ],
  declarations: [
    DevicesComponent
  ]
})
export class DevicesModule { }
