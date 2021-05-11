import { Component, OnInit } from '@angular/core';
import { LoadingController, NavController, ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { WebsocketService } from '../../services/websocket.service';
import * as moment from 'moment';
import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  form: FormGroup;
  constructor (private auth: AuthService, 
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private websocket: WebsocketService,
    private translate: TranslateService,
    private storage: Storage) { }

  ngOnInit () {
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
    });
  }

  registro () {
    this.navController.navigateForward (['registro']);
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
    console.log (event.detail.value);
    moment.locale (event.detail.value);
    this.translate.setDefaultLang (event.detail.value);
    this.storage.set ('lang', event.detail.value);
  }

  google () {
    this.auth.google ();
  }
}
