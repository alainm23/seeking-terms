import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PurchaseMessagePageRoutingModule } from './purchase-message-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { PurchaseMessagePage } from './purchase-message.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PurchaseMessagePageRoutingModule,
    TranslateModule
  ],
  declarations: [PurchaseMessagePage]
})
export class PurchaseMessagePageModule {}
