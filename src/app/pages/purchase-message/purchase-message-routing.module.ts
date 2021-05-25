import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PurchaseMessagePage } from './purchase-message.page';

const routes: Routes = [
  {
    path: '',
    component: PurchaseMessagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PurchaseMessagePageRoutingModule {}
