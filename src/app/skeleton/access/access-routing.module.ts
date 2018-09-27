import { NgModule }                     from '@angular/core';
import { Routes, RouterModule }         from '@angular/router';

import { AccessComponent }              from './access.component';

import { AuthGuard }                    from '../../guards/auth.guard';

const routes: Routes = [
    {
        path: '',
        component: AccessComponent,
        canActivate: [ AuthGuard ]
    }
];

@NgModule({
    imports: [ RouterModule.forChild( routes ) ],
    exports: [ RouterModule ]
})
export class AccessRoutingModule { }
