import { Component } from '@angular/core';

import { SearchComponent } from '../../../../search/search.component';

import { VelocityLimitsService } from '../../../../../services/main/routing/velocity-limits.service';
import { DataBindingService } from '../../../../../services/data.binding.service';

import { FlyInOut } from '../../../../../config/animations.config';


@Component( {
  selector: 'velocity-limits-search',
  templateUrl: '../../../../search/search.component.html',
  styleUrls: [ '../../../../search/search.component.scss' ],
  animations: [ FlyInOut ]
} )
export class VelocityLimitsSearchComponent extends SearchComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: VelocityLimitsService ) {

    super( dataBindingService, itemsService );

  }

}