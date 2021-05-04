import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AdminImagenesPage } from './admin-imagenes.page';

const routes: Routes = [
  {
    path: '',
    component: AdminImagenesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminImagenesPageRoutingModule {}
