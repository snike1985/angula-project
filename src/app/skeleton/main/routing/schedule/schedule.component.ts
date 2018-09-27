import {
  Component,
  OnDestroy
} from '@angular/core';

import { SchedulesService } from '../../../../services/main/routing/schedules.service';


@Component( {
  selector: 'schedule',
  templateUrl: './schedule.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ]
} )
export class ScheduleComponent implements OnDestroy {

  constructor( private schedulesService: SchedulesService ) {}


  public ngOnDestroy(): void {

    this.schedulesService.requestDataSubject.next( {
      filterData: {
        limit_to: '-1',
        transaction_type: '-1',
        status: '-1'
      },
      orderData: {
        name: 'date',
        direction: 0
      },
      searchData: ''
    } );
    this.schedulesService.itemsList.next( [] );

  }

}
