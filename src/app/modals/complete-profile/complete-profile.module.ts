import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CompleteProfilePageRoutingModule } from './complete-profile-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CompleteProfilePage } from './complete-profile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    CompleteProfilePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CompleteProfilePage]
})
export class CompleteProfilePageModule {}
