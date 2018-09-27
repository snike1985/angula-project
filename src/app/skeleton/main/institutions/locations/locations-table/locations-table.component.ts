import {
  Component,
  Renderer2
} from '@angular/core';

import { CustomTableComponent } from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { LocationsRequestsService } from '../../../../../services/main/institutions/locations-requests.service';


@Component({
  selector: 'locations-table',
  templateUrl: './locations-table.component.html',
  styleUrls: ['./locations-table.component.scss']
})
export class LocationsTableComponent extends CustomTableComponent {

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LocationsRequestsService,
    protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}