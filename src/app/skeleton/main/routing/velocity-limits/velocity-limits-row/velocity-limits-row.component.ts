import { Component, OnInit } from '@angular/core';
import { RowStatusChangeComponent } from '../../../../row-status-change/row-status-change.component';
import { DataBindingService } from '../../../../../services/data.binding.service';
import { VelocityLimitsService } from '../../../../../services/main/routing/velocity-limits.service';
import { NotificationService } from '../../../../../services/notification.service';

@Component({
  selector: 'velocity-limits-row',
  templateUrl: './velocity-limits-row.component.html',
  styleUrls: ['./velocity-limits-row.component.scss']
})
export class VelocityLimitsRowComponent extends RowStatusChangeComponent implements OnInit {

  public loading: boolean = false;

  constructor( protected dataBindingService: DataBindingService,
    protected rowStatusService: VelocityLimitsService,
    protected notification: NotificationService ) {

    super( dataBindingService, rowStatusService, notification );

  }

  public ngOnInit(): void {
  }

}
