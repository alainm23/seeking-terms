import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProfileMenuPageRoutingModule } from './profile-menu-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileMenuPage } from './profile-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProfileMenuPageRoutingModule,
    TranslateModule
  ],
  declarations: [ProfileMenuPage]
})
export class ProfileMenuPageModule {}
