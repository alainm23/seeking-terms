import { Component, OnInit } from '@angular/core';
import { ToastController } from '@ionic/angular';

// Services
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  seccion: string = 'profile';
  modo_incognito: boolean = false;
  send_me_gifts: boolean = false;
  auto_renew: boolean = false;
  get_newsletter:boolean = false;
  metric_system: boolean = false;

  winks_notifications: any = {
    alert: false,
    email: false
  }

  favorites_notifications: any = {
    alert: false,
    email: false,
    inbox: false
  }

  message_notifications: any = {
    alert: false,
    email: false
  }

  profile_notifications: any = {
    alert: false,
    email: false,
    inbox: false
  };

  members_and_matches_notifications: any = {
    alert: false,
    email: false
  };

  profile_changes_notifications: any = {
    alert: false,
    email: false
  };

  verification_and_information_notifications: any = {
    alert: false,
    email: false
  };

  special_events_notifications: any = {
    alert: false,
    email: false
  };

  news_and_updates_notifications: any = {
    alert: false,
    email: false
  };

  promotions_notifications: any = {
    alert: false,
    email: false
  };

  constructor (private auth: AuthService,
    private toastController: ToastController) { }

  ngOnInit () {
    this.auth.get_settings ().subscribe ((res: any) => {
      console.log (res);
      this.modo_incognito = res.send_me_gifts;
      this.send_me_gifts = res.send_me_gifts;
      this.auto_renew = res.auto_renew;
      this.get_newsletter = res.get_newsletter;
      this.metric_system = res.metric_system;

      this.winks_notifications = res.winks_notifications;
      this.favorites_notifications = res.favorites_notifications;
      this.message_notifications = res.message_notifications;
      this.members_and_matches_notifications = res.members_and_matches_notifications;
      this.profile_changes_notifications = res.profile_changes_notifications;
      this.verification_and_information_notifications = res.verification_and_information_notifications;
      this.special_events_notifications = res.special_events_notifications;
      this.news_and_updates_notifications = res.news_and_updates_notifications;
      this.promotions_notifications = res.promotions_notifications;
    }, error => {
      console.log (error);
    });
  }

  update (event: any, campo: string) {
    let request: any = {};
    request.campo = campo;
    request.valor = event.detail.checked; 

    this.auth.save_settings (request).subscribe ((res: any) => {
      console.log (res);
      this.presentToast ('Success', 'success');
    }, error => {
      console.log (error);
    });
  }

  update_check (event: any, object: any, campo: string) {
    object [campo] = event.detail.checked;

    this.auth.save_settings (object).subscribe ((res: any) => {
      console.log (res);
      this.presentToast ('Success', 'success');
    }, error => {
      console.log (error);
    });
  }

  async presentToast (message: any, color: string) {
    const toast = await this.toastController.create ({
      message: message,
      color: color,
      duration: 1000,
      position: 'top'
    });

    toast.present ();
  }
}
