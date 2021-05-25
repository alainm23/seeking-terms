import { Component, OnInit } from '@angular/core';
import { Platform } from '@ionic/angular';

// Services
import { Storage } from '@ionic/storage-angular';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { WebsocketService } from './services/websocket.service';
import { OnesignalService } from './services/onesignal.service';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor (private storage: Storage,
    private platform: Platform,
    private translate: TranslateService,
    private websocket: WebsocketService,
    private onesignal: OnesignalService,
    private auth: AuthService) {
      this.OnInit ();
  }

  async OnInit () {
    await this.storage.create ();
    if (this.platform.is ('cordova')) {
      this.platform.ready ().then (() => {
        this.init ();
      });
    } else {
      this.init ();
    }
  }
  
  async init () {
    this.storage.get ('lang').then (async (lang: string) => {
      if (lang === undefined || lang === null) {
        await this.storage.set ('lang', 'en');
        lang = 'en';
      }
      
      moment.locale (lang);
      this.translate.setDefaultLang (lang);
    });

    let user_data: any = JSON.parse (await this.storage.get ('USER_DATA'));
    let user_access: any = JSON.parse (await this.storage.get ('USER_ACCESS'));

    if (user_data !== undefined && user_data !== null) {
      console.log ('Iniciamos WebSocket & OneSignal');
      this.websocket.init_websocket (user_data.id, user_access.access_token);
      this.onesignal.init_onesignal ({USER_ACCESS: user_access, USER_DATA: user_data});
    }

    this.auth.get_user_observable ().subscribe ((res: any) => {
      console.log ('Iniciamos WebSocket & OneSignal', res);
      this.websocket.init_websocket (res.USER_DATA.id, res.USER_ACCESS.access_token);
      this.onesignal.init_onesignal (res);
    });
  }
}
