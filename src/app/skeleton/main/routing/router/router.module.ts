import { NgModule }               from '@angular/core';
import { CommonModule }           from '@angular/common';

import { RouterComponent }        from './router.component';

import { RouterRoutingModule }    from './router-routing.module';

@NgModule({
  imports: [
    CommonModule,
    RouterRoutingModule
  ],
  declarations: [
    RouterComponent
  ]
})
export class RouterModule { }
