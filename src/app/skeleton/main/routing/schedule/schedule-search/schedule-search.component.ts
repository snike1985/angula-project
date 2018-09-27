import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { SchedulesService } from '../../../../../services/main/routing/schedules.service';

import { FlyInOut } from '../../../../../config/animations.config';


@Component( {
  selector: 'schedule-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class ScheduleSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: SchedulesService ) {

    super( dataBindingService, itemsService );

  }

}