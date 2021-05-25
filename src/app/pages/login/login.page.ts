import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController, Platform } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';

// Geo
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
declare var google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  lang: string;
  location: any;
  constructor (private auth: AuthService, 
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private websocket: WebsocketService,
    private translate: TranslateService,
    private storage: Storage,
    private platform: Platform,
    private locationAccuracy: LocationAccuracy,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation) { }

  ngOnInit () {
    this.storage.get ('lang').then (async (lang: string) => {
      this.lang = lang;
      if (lang === undefined || lang === null) {
        this.lang = 'en';
      }

      moment.locale (this.lang);
      this.translate.setDefaultLang (this.lang);
      await this.storage.set ('lang', this.lang);
    });

    this.form = new FormGroup ({
      email: new FormControl ('', [Validators.required]),
      password: new FormControl ('', [Validators.required])
    });
  }
  
  async submit () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.auth.login (this.form.value.email, this.form.value.password).subscribe ((res: any) => {
      console.log (res);
      this.auth.save_local_user (res).then (() => {
        loading.dismiss ();
        this.navController.navigateRoot ('home');
      });
    }, error => {
      loading.dismiss ();
      console.log (error);
      this.presentToast (this.translate.instant ('The access data is incorrect'), 'danger');
    });
  }

  registro () {
    this.navController.navigateForward (['request-gps', 'null']);
  }

  async presentToast (message: any, color: string) {
    const toast = await this.toastController.create ({
      message: message,
      color: color,
      duration: 2000,
      position: 'top'
    });

    toast.present ();
  }

  change_lan (event: any) {
    moment.locale (event.detail.value);
    this.translate.setDefaultLang (event.detail.value);
    this.storage.set ('lang', event.detail.value);
  }

  google () {
    if (this.platform.is ('cordova')) {
      this.auth.google ();
    } else {
      let request: any = {
          "accessToken":"ssya29.a0AfH6SMBvrBLLrvmH29sCMjRBCMSVy7jhi_QQEesqr6BqRplwu0lLey5lCCRDDbSrLoFoCCTTGhopQ3DBr_E-hO5LbbkBZxLDhnbCxYbEJxryqeR-7pp34xvo99laK3i6sE7alZfg-k6srTjSMsm6VX_MqnpE",
          "expires":1620843027,
          "expires_in":1166,
          "email":"cccccd@gmail.com",
          "userId":"cccccdssss",
          "displayName":"Alain",
          "givenName":"Alain",
          "imageUrl":"https://lh3.googleusercontent.com/a-/AOh14GiBhVvYRxAalxzaYLaRSoKgw-fGUGXy44KhO7_lCw"
      };
      
      this.auth.login_social (request.userId, 'Google', request.displayName, request.email).subscribe ((res: any) => {
        console.log (res);
        if (res.user.registro_incompleto == 1) {
          this.navController.navigateForward (['request-gps', res.user.id]);
        } else {
          this.auth.save_local_user (res).then (() => {
            this.navController.navigateRoot ('home');
          });
        }
      }, error => {
        console.log (error);
      });
    }
  }

  facebook () {
    if (this.platform.is ('cordova')) {
      this.auth.facebook ();
    } else {
      let request: any = {
        "id":"ffffffffffffddddddd",
        "name":"Alain Meza",
        "first_name":"Alain aaaa",
        "last_name":"Meza",
        "picture_large":{
          "data":{
            "height":720,
            "is_silhouette":false,
            "url":"https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=474482330467820&height=720&width=720&ext=1623432379&hash=AeT8Bj8QPVcUwAeQtcM",
            "width":720
          }
        }
      };

      this.auth.login_social (request.id, 'Facebook', request.first_name, '').subscribe ((res: any) => {
        console.log (res);
        if (res.user.registro_incompleto == 1) {
          this.navController.navigateForward (['request-gps', res.user.id]);
        } else {
          this.auth.save_local_user (res).then (() => {
            this.navController.navigateRoot ('home');
          });
        }
      }, error => {
        console.log (error);
      });
    }
  }

  show_api_error (res: any, values: string []) {
    values.forEach ((value: string) => {
      if (res.errors [value]) {
        res.errors [value].forEach ((error: string) => {
          this.presentToast (error, 'danger');
        });
      }
    });
  }
}
