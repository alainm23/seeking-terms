import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CountrySelectPageRoutingModule } from './country-select-routing.module';

import { CountrySelectPage } from './country-select.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CountrySelectPageRoutingModule
  ],
  declarations: [CountrySelectPage]
})
export class CountrySelectPageModule {}
