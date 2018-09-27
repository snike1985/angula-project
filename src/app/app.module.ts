import {
  BrowserModule,
  Title
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpModule } from '@angular/http';
import { AppRoutingModule } from './app-routing.module';
import { OverlayModule } from './controls/overlay/overlay.module';

import { AppComponent } from './app.component';

import { AuthService } from './services/auth.service';
import { DataBindingService } from './services/data.binding.service';
import { OverlayService } from './services/overlay.service';
import { UsersRequestsService } from './services/main/settings/users-requests.service';
import { NotificationService } from './services/notification.service';
import { InstitutionsRequestsService } from './services/main/institutions/institutions-requests.service';
import { MerchantsRequestsService } from './services/main/institutions/merchants-requests.service';
import { LocationsRequestsService } from './services/main/institutions/locations-requests.service';
import { DevicesRequestsService } from './services/main/institutions/devices-requests.service';
import { DeviceTypesRequestsService } from './services/main/settings/device-types-requests.service';
import { CountriesRequestsService } from './services/main/settings/countries-requests.service';
import { CountryStatesRequestsService } from './services/main/settings/country-states-requests.service';
import { LogsAuditRequestsService } from './services/main/logs/logs-audit.service';
import { LogsAccessRequestsService } from './services/main/logs/logs-access.service';
import { TransactionLogsService } from './services/main/logs/transaction-logs.service';
import { WorkflowService } from './services/main/workflow/workflow.service';
import { CurrenciesRequestsService } from './services/main/settings/currencies-requests.service';
import { NotificationComponent } from './skeleton/notification/notification.component';


@NgModule( {
  declarations: [
    AppComponent,
    NotificationComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpModule,
    OverlayModule,
    AppRoutingModule
  ],
  providers: [
    DataBindingService,
    AuthService,
    OverlayService,
    UsersRequestsService,
    NotificationService,
    InstitutionsRequestsService,
    MerchantsRequestsService,
    LocationsRequestsService,
    DeviceTypesRequestsService,
    DevicesRequestsService,
    CountriesRequestsService,
    CountryStatesRequestsService,
    LogsAuditRequestsService,
    LogsAccessRequestsService,
    TransactionLogsService,
    WorkflowService,
    Title,
    CurrenciesRequestsService
  ],
  bootstrap: [ AppComponent ]
} )

export class AppModule {}
