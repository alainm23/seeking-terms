import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CountrySelectPage } from './country-select.page';

const routes: Routes = [
  {
    path: '',
    component: CountrySelectPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CountrySelectPageRoutingModule {}
