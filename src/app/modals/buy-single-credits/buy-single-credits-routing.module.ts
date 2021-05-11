import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuySingleCreditsPage } from './buy-single-credits.page';

const routes: Routes = [
  {
    path: '',
    component: BuySingleCreditsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuySingleCreditsPageRoutingModule {}
