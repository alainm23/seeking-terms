import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountrySelectPageRoutingModule } from './country-select-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { CountrySelectPage } from './country-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountrySelectPageRoutingModule,
    TranslateModule
  ],
  declarations: [CountrySelectPage]
})
export class CountrySelectPageModule {}
