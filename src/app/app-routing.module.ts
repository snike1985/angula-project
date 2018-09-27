import { NgModule }              from '@angular/core';
import { Routes, RouterModule }  from '@angular/router';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: './skeleton/access/access.module#AccessModule',
        pathMatch: 'full'
    },
    {
        path: '',
        loadChildren: './skeleton/main/main.module#MainModule'
    },
    {
        path: '404',
        loadChildren: './skeleton/errors/errors.module#ErrorsModule'
    },
    {
        path: 'server-maintenance',
        loadChildren: './skeleton/errors/errors.module#ErrorsModule'
    },
    {
        path: 'session-expired',
        loadChildren: './skeleton/errors/errors.module#ErrorsModule'
    },
    {
        path: 'server-error',
        loadChildren: './skeleton/errors/errors.module#ErrorsModule'
    },
    {
        path: 'access-denied',
        loadChildren: './skeleton/errors/errors.module#ErrorsModule'
    },
    {
        path: '**',
        redirectTo: '404'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
