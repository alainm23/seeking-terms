import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditFotosPageRoutingModule } from './edit-fotos-routing.module';

import { EditFotosPage } from './edit-fotos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditFotosPageRoutingModule
  ],
  declarations: [EditFotosPage]
})
export class EditFotosPageModule {}
