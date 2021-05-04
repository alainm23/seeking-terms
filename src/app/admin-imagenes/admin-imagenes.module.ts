import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AdminImagenesPageRoutingModule } from './admin-imagenes-routing.module';

import { AdminImagenesPage } from './admin-imagenes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AdminImagenesPageRoutingModule
  ],
  declarations: [AdminImagenesPage]
})
export class AdminImagenesPageModule {}
