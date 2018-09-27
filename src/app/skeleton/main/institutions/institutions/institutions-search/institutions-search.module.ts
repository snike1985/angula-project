import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { ReactiveFormsModule }          from '@angular/forms';

import { InstitutionsSearchComponent }  from './institutions-search.component';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    InstitutionsSearchComponent
  ],
  exports: [
    InstitutionsSearchComponent
  ]
})
export class InstitutionsSearchModule { }
