import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditProfileFormPage } from './edit-profile-form.page';

const routes: Routes = [
  {
    path: '',
    component: EditProfileFormPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EditProfileFormPageRoutingModule {}
