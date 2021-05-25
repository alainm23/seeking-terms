import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { RequestGpsPageRoutingModule } from './request-gps-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { RequestGpsPage } from './request-gps.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RequestGpsPageRoutingModule,
    TranslateModule
  ],
  declarations: [RequestGpsPage]
})
export class RequestGpsPageModule {}
