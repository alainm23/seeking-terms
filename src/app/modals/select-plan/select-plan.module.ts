import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPlanPageRoutingModule } from './select-plan-routing.module';

import { SelectPlanPage } from './select-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPlanPageRoutingModule
  ],
  declarations: [SelectPlanPage]
})
export class SelectPlanPageModule {}
