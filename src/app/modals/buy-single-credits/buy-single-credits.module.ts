import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuySingleCreditsPageRoutingModule } from './buy-single-credits-routing.module';

import { BuySingleCreditsPage } from './buy-single-credits.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuySingleCreditsPageRoutingModule
  ],
  declarations: [BuySingleCreditsPage]
})
export class BuySingleCreditsPageModule {}
