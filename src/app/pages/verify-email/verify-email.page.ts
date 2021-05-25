import { Component, OnInit } from '@angular/core';

// Services
import { WebsocketService } from '../../services/websocket.service';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import { LoadingController, NavController } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-verify-email',
  templateUrl: './verify-email.page.html',
  styleUrls: ['./verify-email.page.scss'],
})
export class VerifyEmailPage implements OnInit {
  constructor (private websocket: WebsocketService, private database: DatabaseService,
    private auth: AuthService, private loadingController: LoadingController,
    private navController: NavController, private route: ActivatedRoute, private storage: Storage) { }

  ngOnInit () {
    this.websocket.create_channel ().listen ('.EmailVerified', async (res: any) => {
      console.log (res);
      this.auth.USER_DATA.email_verified_at = true;
      await this.storage.set ('USER_DATA', JSON.stringify (this.auth.USER_DATA));
      this.navController.navigateRoot ('home');
    });
  }

  async validar_correo () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.auth.get_user ().subscribe (async (res: any) => {
      console.log (res);
      loading.dismiss ();

      if (res.email_verified_at !== null) {
        this.auth.USER_DATA.email_verified_at = true;
        await this.storage.set ('USER_DATA', JSON.stringify (this.auth.USER_DATA));
        this.navController.navigateRoot ('home');
      } else {

      }
    }, error => {
      console.log (error);
      loading.dismiss ();
    });
  }
}
