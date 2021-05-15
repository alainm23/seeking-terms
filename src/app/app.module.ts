import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

// Native Storage
import { IonicStorageModule } from '@ionic/storage-angular';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { GooglePlus } from '@ionic-native/google-plus/ngx';

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
import { SelectPlanPageModule } from './modals/select-plan/select-plan.module';
import { BuySingleCreditsPageModule } from './modals/buy-single-credits/buy-single-credits.module';
import { UpgradeAccountMenuPageModule } from './modals/upgrade-account-menu/upgrade-account-menu.module';
import { PaymentPageModule } from './modals/payment/payment.module';
import { Facebook } from '@ionic-native/facebook/ngx';
import { AdMobFree } from '@ionic-native/admob-free/ngx';
import { AdmobService } from './services/admob.service';

//Translation
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

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
    CompleteProfilePageModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => {
          return new TranslateHttpLoader(http);
        },
        deps: [ HttpClient ]
      }
    }),
    SelectPlanPageModule,
    BuySingleCreditsPageModule,
    UpgradeAccountMenuPageModule,
    PaymentPageModule,
    IonicStorageModule.forRoot ()
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    Camera,
    Clipboard,
    AdMobFree,
    AdmobService,
    File,
    Crop,
    OneSignal,
    GooglePlus,
    Facebook
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
