import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { TransactionLogsItemConfig } from '../../../../../config/transaction-log.config';

@Component({
  selector: 'transaction-log-item',
  templateUrl: './transaction-log-item.component.html',
  styleUrls: ['./transaction-log-item.component.scss']
})
export class TransactionLogItemComponent implements OnInit {

  @Input() public currentItem: Object;
  @Input() public lang: string;

  private config = TransactionLogsItemConfig;

  public opened: boolean = false;
  public texts;

  constructor() { }

  public ngOnInit(): void {

    this.texts = this.config[ 'texts' ][ this.lang ];

  }

}
