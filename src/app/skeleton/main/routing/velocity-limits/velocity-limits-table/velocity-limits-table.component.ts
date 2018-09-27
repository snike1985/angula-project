import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { VelocityLimitsService } from '../../../../../services/main/routing/velocity-limits.service';


@Component( {
  selector: 'velocity-limits-table',
  templateUrl: './velocity-limits-table.component.html',
  styleUrls: [ './velocity-limits-table.component.scss' ]
} )
export class VelocityLimitsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: VelocityLimitsService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
