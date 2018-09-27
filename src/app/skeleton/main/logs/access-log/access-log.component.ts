import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { ContentCommonComponent }           from '../../../content-common/content-common.component';
import { DataBindingService }               from '../../../../services/data.binding.service';
import { FadeInOut, VisibilityChanged }     from '../../../../config/animations.config';
import { FilterTableComponent } from '../../../filter-table/filter-table.component';
import { AccessLogsConfig } from '../../../../config/access-log.config';
import { Subscription } from 'rxjs/Subscription';
import { LogsAccessRequestsService } from '../../../../services/main/logs/logs-access.service';
import { NotificationService } from '../../../../services/notification.service';
import { UsersRequestsService } from '../../../../services/main/settings/users-requests.service';

@Component({
  selector: 'access-log',
  templateUrl: './access-log.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [ VisibilityChanged, FadeInOut ]
})
export class AccessLogComponent extends FilterTableComponent implements OnDestroy {

  protected listName: string = 'logsList';

  public config = AccessLogsConfig;
  public countries: any;

  private usersSubscription: Subscription;
  private usersOptions: any;


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAccessRequestsService,
    protected notificationService: NotificationService,
    protected  elemHref: ElementRef,
    protected renderer: Renderer2,
    private usersService: UsersRequestsService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }


  private subscribeUsers(): void {

    this.usersSubscription = this.usersService.itemsList.subscribe( ( users: any ) => {

      if ( users.length ) {

        this.usersOptions = users;

        this.updateFilter( 'user', this.usersOptions );


      } else {

        this.usersService.getSelectOptions();

      }

    } );

  }

  private unSubscribeUsers(): void {

    if ( this.usersSubscription && !this.usersSubscription.closed ) {

      this.usersSubscription.unsubscribe();

    }

  }

  protected getFilterData(): void {

    this.setFilterLanguage();
    this.subscribeUsers();

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

    this.unSubscribeUsers();

  }


  public ngOnDestroy(): void {

    this.itemsService.requestDataSubject.next( {
      filterData: {
        user: '-1',
        loginResult: '-1',
        period: '-1'
      },
      orderData: {
        name: 'log_in',
        direction: 0
      },
      searchData: ''
    } );

    this.itemsService.itemsList.next( [] );
    this.usersService.itemsList.next( [] );


  }

}

