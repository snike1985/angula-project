import {
  Component,
  Input,
  OnInit
} from '@angular/core';

import { FilterComponent } from '../../../../filter-table/filter/filter.component';

import { DataBindingService } from '../../../../../services/data.binding.service';
import { OverlayService } from '../../../../../services/overlay.service';
import { TransactionLogsService } from '../../../../../services/main/logs/transaction-logs.service';
import { DatePipe } from '@angular/common';
import { FilterConfig } from '../../../../../config/filter.config';
import { NumberFormatPipe } from '../../../../../pipes/number-format.pipe';


@Component( {
  selector: 'transaction-logs-filter',
  templateUrl: './transaction-logs-filter.component.html',
  styleUrls: [ '../../../../filter-table/filter/filter.component.scss' ]
} )
export class TransactionLogsFilterComponent extends FilterComponent implements OnInit {

  @Input() forReview: number = 0;

  public texts: Object;
  public config = FilterConfig;
  public opened: boolean = false;

  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: TransactionLogsService,
    protected overlayService: OverlayService,
    protected datePipe: DatePipe,
    private numberFormatPipe: NumberFormatPipe ) {

    super( dataBindingService, itemsService, overlayService, datePipe );

  }


  protected getAmountString( amount ): string {

    let result = '';

    if ( amount[ 'from' ] ) {
      result += this.numberFormatPipe.transform( amount[ 'from' ] );
    } else {
      result += '0';
    }


    if ( amount[ 'to' ] ) {
      result += `-${ this.numberFormatPipe.transform( amount[ 'to' ] ) }`;
    }

    return result;

  }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.lang ];

    this.subscribeFilterData();


  }

}
