import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpgradeAccountMenuPage } from './upgrade-account-menu.page';

const routes: Routes = [
  {
    path: '',
    component: UpgradeAccountMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpgradeAccountMenuPageRoutingModule {}
