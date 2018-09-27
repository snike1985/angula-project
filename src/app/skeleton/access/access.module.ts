import { NgModule }              from '@angular/core';
import { CommonModule }          from '@angular/common';
import { ReactiveFormsModule }   from '@angular/forms';
import { AccessRoutingModule }   from './access-routing.module';
import { DropEfectGlobalModule } from '../../modules/drop-efect-global.module';
import { FooterModule }          from '../footer/footer.module';

import { AccessComponent }       from './access.component';
import { LoginComponent }        from './login/login.component';
import { PasswordComponent }     from './password/password.component';
import { NewPasswordComponent }  from './new-password/new-password.component';

import { AuthGuard }             from '../../guards/auth.guard';


@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AccessRoutingModule,
    DropEfectGlobalModule,
    FooterModule
  ],
  declarations: [
    LoginComponent,
    PasswordComponent,
    NewPasswordComponent,
    AccessComponent
  ],
  providers: [
    AuthGuard
  ]
})
export class AccessModule {
}
