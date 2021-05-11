import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { UpgradeAccountMenuPageRoutingModule } from './upgrade-account-menu-routing.module';

import { UpgradeAccountMenuPage } from './upgrade-account-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpgradeAccountMenuPageRoutingModule
  ],
  declarations: [UpgradeAccountMenuPage]
})
export class UpgradeAccountMenuPageModule {}
