import {
  Component,
  ElementRef,
  OnDestroy,
  Renderer2
} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { FilterTableComponent } from '../../../filter-table/filter-table.component';

import { DataBindingService } from '../../../../services/data.binding.service';
import { NotificationService } from '../../../../services/notification.service';
import { LogsAuditRequestsService } from '../../../../services/main/logs/logs-audit.service';
import { UsersRequestsService } from '../../../../services/main/settings/users-requests.service';

import {
  FadeInOut,
  VisibilityChanged
} from '../../../../config/animations.config';
import { AuditLogsConfig } from '../../../../config/audit-log.config';
import { ObjectTypesService } from '../../../../services/object-types.service';


@Component( {
  selector: 'audit-log',
  templateUrl: './audit-log.component.html',
  styleUrls: [ '../../../filter-table/filter-table.component.scss' ],
  animations: [
    VisibilityChanged,
    FadeInOut
  ]
} )
export class AuditLogComponent extends FilterTableComponent implements OnDestroy {

  protected listName: string = 'logsList';

  public config = AuditLogsConfig;
  public countries: any;

  private usersSubscription: Subscription;
  private usersOptions: any;


  constructor( protected dataBindingService: DataBindingService,
    protected itemsService: LogsAuditRequestsService,
    protected notificationService: NotificationService,
    protected  elemHref: ElementRef,
    protected renderer: Renderer2,
    private usersService: UsersRequestsService,
    private objectTypesService: ObjectTypesService ) {

    super( dataBindingService, itemsService, notificationService, elemHref, renderer );

  }


  private objectTypesSubscription: Subscription;
  private objectTypes: any;

  private subscribeObjectTypes(): void {

    this.objectTypesSubscription = this.objectTypesService.itemsList.subscribe( ( objectTypes: any ) => {

      if ( objectTypes.length ) {

        this.objectTypes = objectTypes;

        this.updateFilter( 'object', this.objectTypes );


      } else {

        this.objectTypesService.getAll();

      }


    } );

  }

  private unSubscribeObjectTypes(): void {

    if ( this.objectTypesSubscription && !this.objectTypesSubscription.closed ) {

      this.objectTypesSubscription.unsubscribe();

    }

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
    this.subscribeObjectTypes();

  }

  protected unsubscribeAll(): void {

    this.globalSettingsSubscription.unsubscribe();

    this.scrollSubscription.unsubscribe();

    this.tableDataSubscription.unsubscribe();

    this.requestDataSubscription.unsubscribe();

    this.view.unsubscribe();

    this.unSubscribeUsers();
    this.unSubscribeObjectTypes();

  }


  public ngOnDestroy(): void {

    this.itemsService.requestDataSubject.next( {
      filterData: {
        object: '-1',
        action: '-1',
        period: '-1',
        user: '-1'
      },
      orderData: {
        name: 'date',
        direction: 0
      },
      searchData: ''
    } );

    this.itemsService.itemsList.next( [] );
    this.usersService.itemsList.next( [] );

  }

}


