import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditFotosPage } from './edit-fotos.page';

const routes: Routes = [
  {
    path: '',
    component: EditFotosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditFotosPageRoutingModule {}
