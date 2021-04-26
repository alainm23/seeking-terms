import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProfileMenuPage } from './profile-menu.page';

const routes: Routes = [
  {
    path: '',
    component: ProfileMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileMenuPageRoutingModule {}
