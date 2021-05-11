import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SelectPlanPage } from './select-plan.page';

const routes: Routes = [
  {
    path: '',
    component: SelectPlanPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SelectPlanPageRoutingModule {}
