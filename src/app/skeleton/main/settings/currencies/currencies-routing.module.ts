import { NgModule }                 from '@angular/core';
import { Routes, RouterModule }     from '@angular/router';
import { CurrenciesComponent }      from './currencies.component';


const routes: Routes = [
  {
    path: '',
    component: CurrenciesComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CurrenciesRoutingModule { }
