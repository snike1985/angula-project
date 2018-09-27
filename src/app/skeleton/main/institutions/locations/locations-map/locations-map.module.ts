import { NgModule }                 from '@angular/core';
import { CommonModule }             from '@angular/common';
import { AgmCoreModule }            from '@agm/core';

import { MarkerClusterDirective }   from '../../../../../directives/marker-cluster.directive';
import { LocationsMapComponent }    from './locations-map.component';
import { GMapsService }             from '../../../../../services/main/institutions/locations-geocoding.service';

@NgModule({
  imports: [
    CommonModule,
    AgmCoreModule
  ],
  declarations: [
    LocationsMapComponent,
    MarkerClusterDirective
  ],
  exports: [ LocationsMapComponent ],
  providers: [ GMapsService ]
})
export class LocationsMapModule { }
