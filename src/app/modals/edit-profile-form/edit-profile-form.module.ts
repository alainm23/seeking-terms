import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditProfileFormPageRoutingModule } from './edit-profile-form-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { EditProfileFormPage } from './edit-profile-form.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditProfileFormPageRoutingModule,
    ReactiveFormsModule,
    TranslateModule
  ],
  declarations: [EditProfileFormPage]
})
export class EditProfileFormPageModule {}
