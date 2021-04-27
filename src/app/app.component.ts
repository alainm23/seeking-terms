import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// Services
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import Pusher from "pusher-js"
import { OneSignal } from '@ionic-native/onesignal/ngx';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor (private storage: Storage, private platform: Platform,
    private oneSignal: OneSignal) {
    this.OnInit ();
  }

  OnInit () {
    this.platform.ready ().then (async () => {
      this.storage.create ();
      moment.locale ('en');
      this.init_onesignal (JSON.parse (await this.storage.get ('USER_DATA')));
    });
  }

  init_onesignal (user: any) {
    if (this.platform.is ('cordova') === false || user == null || user == undefined) {
      return;
    }

    console.log (user);

    this.oneSignal.startInit ('44ce9816-3902-4d54-8ba0-dfb14bfb85e9', '905206280664');
    this.oneSignal.inFocusDisplaying (this.oneSignal.OSInFocusDisplayOption.Notification);

    this.oneSignal.handleNotificationReceived ().subscribe (() => {
    // do something when notification is received
    });

    this.oneSignal.handleNotificationOpened ().subscribe (() => {
      // do something when a notification is opened
    });

    this.oneSignal.endInit ();
  }
}
