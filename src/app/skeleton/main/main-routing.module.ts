import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { MainComponent }                from './main.component';
import { DashboardComponent }           from './dashboard/dashboard.component';

import { AuthGuard }                    from '../../guards/auth.guard';
import { DesktopGuard } from '../../guards/desktop.guard';


const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        canActivate: [ AuthGuard ],
        children: [
            {
                path: '',
                component: DashboardComponent,
            },
            {
                path: 'profile',
                loadChildren: './profile/profile.module#ProfileModule',
            },

            // institutions
            {
                path: 'institutions/merchants',
                loadChildren: './institutions/merchants/merchants.module#MerchantsModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'institutions/locations',
                loadChildren: './institutions/locations/locations.module#LocationsModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'institutions/devices',
                loadChildren: './institutions/devices/devices.module#DevicesModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'institutions',
                loadChildren: './institutions/institutions/institutions.module#InstitutionsModule',
                canActivate: [ DesktopGuard ]
            },
            /// institutions


            // logs
            {
                path: 'logs/access-log',
                loadChildren: './logs/access-log/access-log.module#AccessLogModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'logs/audit-log',
                loadChildren: './logs/audit-log/audit-log.module#AuditLogModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'logs/transaction-log',
                loadChildren: './logs/transaction-log/transaction-log.module#TransactionLogModule',
                canActivate: [ DesktopGuard ]
            },
            /// logs


            // routing
            {
                path: 'routing/router',
                loadChildren: './routing/router/router.module#RouterModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'routing/workflows',
                loadChildren: './routing/workflows/workflows.module#WorkflowsModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'routing/velocity-limits',
                loadChildren: './routing/velocity-limits/velocity-limits.module#VelocityLimitsModule',
                canActivate: [ DesktopGuard ]
            },
            {
                path: 'routing/schedule',
                loadChildren: './routing/schedule/schedule.module#ScheduleModule',
                canActivate: [ DesktopGuard ]
            },
            /// routing


            // monitoring
            {
                path: 'monitoring',
                loadChildren: './monitoring/monitoring.module#MonitoringModule',
            },
            // monitoring


            // settings
            {
                path: 'settings',
                redirectTo: 'settings/users',
                pathMatch: 'full'
            },
            {
                path: 'settings/countries',
                loadChildren: './settings/countries/countries.module#CountriesModule',
            },
            {
                path: 'settings/country-states',
                loadChildren: './settings/country-states/country-states.module#CountryStatesModule',
            },
            {
                path: 'settings/currencies',
                loadChildren: './settings/currencies/currencies.module#CurrenciesModule',
            },
            {
                path: 'settings/device-types',
                loadChildren: './settings/device-types/device-types.module#DeviceTypesModule',
            },
            {
                path: 'settings/user-roles',
                loadChildren: './settings/user-roles/user-roles.module#UserRolesModule',
            },
            {
                path: 'settings/users',
                loadChildren: './settings/users/users.module#UsersModule',
            },
            {
                path: 'settings/viewing-settings',
                loadChildren: './settings/viewing-settings/viewing-settings.module#ViewingSettingsModule',
            }
            /// settings


            // {
            //     path: '**',
            //     redirectTo: 'dashboard',
            // }
        ]
    }
];

@NgModule({
  imports: [RouterModule.forChild( routes )],
  exports: [RouterModule]
})
export class MainRoutingModule { }
