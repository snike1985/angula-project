import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { SchedulesService } from '../../../../../services/main/routing/schedules.service';


@Component( {
  selector: 'schedule-table',
  templateUrl: './schedule-table.component.html',
  styleUrls: [ './schedule-table.component.scss' ]
} )
export class ScheduleTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: SchedulesService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
