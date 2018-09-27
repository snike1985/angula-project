import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsRoutingModule } from './locations-routing.module';

import { LocationsComponent } from './locations.component';
import { AgmCoreModule } from '@agm/core';
import { environment } from '../../../../../environments/environment';

@NgModule( {
  imports: [
    CommonModule,
    LocationsRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: environment.googleMapsAPIKey
    })
  ],
  declarations: [
    LocationsComponent
  ]
} )
export class LocationsModule {
}
