import { NgModule }                from '@angular/core';
import { CommonModule }            from '@angular/common';
import { MainRoutingModule }       from './main-routing.module';
import { CountModule }             from '../../modules/count.module';
import { DropEfectGlobalModule }   from '../../modules/drop-efect-global.module';
import {
  PerfectScrollbarConfigInterface,
  PerfectScrollbarModule
}                                  from 'ngx-perfect-scrollbar';
import { FooterModule }            from '../footer/footer.module';
import { ActiveEffectModule }      from '../../modules/active-effect.module';
import { TimeModule }              from '../../modules/time.module';

import { MainComponent }           from './main.component';
import { DashboardComponent }      from './dashboard/dashboard.component';
import { MenuComponent }           from './menu/menu.component';

import { ViewingSettingsService }  from '../../services/main/settings/viewing-settings.service';

import { AuthGuard }               from '../../guards/auth.guard';
import { DesktopGuard }            from '../../guards/desktop.guard';

import { InnerHtmlDirective }      from '../../directives/innerhtml.directive';


const PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};


@NgModule({
  imports: [
    CommonModule,
    CountModule,
    ActiveEffectModule,
    DropEfectGlobalModule,
    FooterModule,
    TimeModule,
    PerfectScrollbarModule.forRoot( PERFECT_SCROLLBAR_CONFIG ),
    MainRoutingModule
  ],
  declarations: [
    MainComponent,
    DashboardComponent,
    MenuComponent,

    InnerHtmlDirective
  ],
  providers: [
    ViewingSettingsService,
    AuthGuard,
    DesktopGuard
  ]
})
export class MainModule { }
