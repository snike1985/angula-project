import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsSearchComponent } from './locations-search.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  declarations: [
    LocationsSearchComponent
  ],
  exports: [
    LocationsSearchComponent
  ]
})
export class LocationsSearchModule { }
