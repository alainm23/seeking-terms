import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PermisosCorreoPageRoutingModule } from './permisos-correo-routing.module';

import { PermisosCorreoPage } from './permisos-correo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PermisosCorreoPageRoutingModule
  ],
  declarations: [PermisosCorreoPage]
})
export class PermisosCorreoPageModule {}
