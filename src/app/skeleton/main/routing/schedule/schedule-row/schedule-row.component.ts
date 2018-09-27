import { Component, OnInit } from '@angular/core';
import { RowStatusChangeComponent } from '../../../../row-status-change/row-status-change.component';
import { SchedulesService } from '../../../../../services/main/routing/schedules.service';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { NotificationService } from '../../../../../services/notification.service';

@Component({
  selector: 'schedule-row',
  templateUrl: './schedule-row.component.html',
  styleUrls: ['./schedule-row.component.scss']
})
export class ScheduleRowComponent extends RowStatusChangeComponent implements OnInit {

  public loading: boolean = false;

  constructor( protected dataBindingService: DataBindingService,
    protected rowStatusService: SchedulesService,
    protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }

  public ngOnInit(): void {
  }

}
