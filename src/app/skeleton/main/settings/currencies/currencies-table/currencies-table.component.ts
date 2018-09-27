import {
  Component,
  Renderer2
}                                     from '@angular/core';

import { CustomTableComponent }       from '../../../../filter-table/custom-table/custom-table.component';

import { DataBindingService }         from '../../../../../services/data.binding.service';
import { CurrenciesRequestsService }  from '../../../../../services/main/settings/currencies-requests.service';

@Component({
  selector: 'currencies-table',
  templateUrl: './currencies-table.component.html',
  styleUrls: ['./currencies-table.component.scss']
})
export class CurrenciesTableComponent extends CustomTableComponent {

  constructor ( protected dataBindingService: DataBindingService,
                protected itemsService: CurrenciesRequestsService,
                protected renderer: Renderer2 ) {

    super( dataBindingService, itemsService, renderer );

  }

}
