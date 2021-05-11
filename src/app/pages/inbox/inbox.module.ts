import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { InboxPageRoutingModule } from './inbox-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { InboxPage } from './inbox.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InboxPageRoutingModule,
    TranslateModule
  ],
  declarations: [InboxPage]
})
export class InboxPageModule {}
