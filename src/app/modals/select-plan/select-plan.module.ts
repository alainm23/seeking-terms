import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SelectPlanPageRoutingModule } from './select-plan-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { SelectPlanPage } from './select-plan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SelectPlanPageRoutingModule,
    TranslateModule
  ],
  declarations: [SelectPlanPage]
})
export class SelectPlanPageModule {}
