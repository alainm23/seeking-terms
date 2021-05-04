import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PermisosCorreoPage } from './permisos-correo.page';

const routes: Routes = [
  {
    path: '',
    component: PermisosCorreoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PermisosCorreoPageRoutingModule {}
