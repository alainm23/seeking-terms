import { Injectable } from '@angular/core';

// services
import { OneSignal, OSNotification, OSNotificationOpenedResult } from '@ionic-native/onesignal/ngx';
import { Platform } from '@ionic/angular';
import { AuthService } from '../services/auth.service';
import { DatabaseService } from'../services/database.service';

@Injectable({
  providedIn: 'root'
})
export class OnesignalService {

  constructor (private oneSignal: OneSignal, private auth: AuthService,
      private platform: Platform, private database: DatabaseService) {
  }

  init_onesignal (res: any) {
    if (this.platform.is ('cordova') === false || res.USER_ACCESS ===  null || res.USER_ACCESS === undefined) {
      return;
    }

    this.oneSignal.startInit ('44ce9816-3902-4d54-8ba0-dfb14bfb85e9', '905206280664');
    this.oneSignal.inFocusDisplaying (this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived ().subscribe ((response: OSNotification) => {
      // do something when notification is received
      // console.log (response.dis)
    });

    this.oneSignal.handleNotificationOpened ().subscribe ((response: OSNotificationOpenedResult) => {
      // do something when a notification is opened
    });
  
    this.oneSignal.getIds ().then ((identity: any) => {
      this.database.save_onesignal_player_id (identity.userId).subscribe ((res: any) => {
        console.log ('PLAYER_ID REGISTRADO', res);
      }, error => {
        console.log (error);
      });
    });

    this.oneSignal.endInit ();
  }
}
