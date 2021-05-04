import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Native Storage
import { Storage } from '@ionic/storage';
import { HttpClientModule } from '@angular/common/http';

// Camera
import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { Crop } from '@ionic-native/crop/ngx';
import { OneSignal } from '@ionic-native/onesignal/ngx';

// Form
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OrderModule } from 'ngx-order-pipe';

// Modals
import { CountrySelectPageModule } from './modals/country-select/country-select.module';
import { FilterPageModule } from './modals/filter/filter.module';
import { ChatPageModule } from './modals/chat/chat.module';
import { CompleteProfilePageModule } from './modals/complete-profile/complete-profile.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [
    BrowserModule,
    IonicModule.forRoot (),
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    CountrySelectPageModule,
    FilterPageModule,
    ChatPageModule,
    OrderModule,
    CompleteProfilePageModule
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Storage,
    Camera,
    File,
    Crop,
    OneSignal
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
