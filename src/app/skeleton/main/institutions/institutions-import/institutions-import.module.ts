import { NgModule }                     from '@angular/core';
import { CommonModule }                 from '@angular/common';
import { Ng2FileDropModule }            from 'ng2-file-drop';
import { PerfectScrollbarModule }       from 'ngx-perfect-scrollbar';

import { InstitutionsImportComponent }  from './institutions-import.component';

@NgModule({
  imports: [
    CommonModule,
    Ng2FileDropModule,
    PerfectScrollbarModule
  ],
  declarations: [
    InstitutionsImportComponent
  ],
  exports: [
    InstitutionsImportComponent
  ]
})
export class InstitutionsImportModule { }
