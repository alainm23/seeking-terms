import { Component, OnInit } from '@angular/core';

// Services
import { ModalController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { CompleteProfilePage } from '../../modals/complete-profile/complete-profile.page';
import { IonRouterOutlet } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-profile-menu',
  templateUrl: './profile-menu.page.html',
  styleUrls: ['./profile-menu.page.scss'],
})
export class ProfileMenuPage implements OnInit {
  complete_perfil: any;
  constructor (private modalController: ModalController,
    private routerOutlet: IonRouterOutlet,
    private database: DatabaseService,
    private loadingController: LoadingController,
    public auth: AuthService,
    private storage: Storage,
    private alertController: AlertController,
    private loadingCo1ntroller: LoadingController,
    private navController: NavController) { }

  ngOnInit () {
    
  }

  back () {
    this.navController.back ();
  }

  async complete_profile () {
    // const loading = await this.loadingCo1ntroller.create({
    //   translucent: true,
    //   spinner: 'lines-small',
    //   mode: 'ios'
    // });

    // await loading.present ();

    // this.database.get_porcentaje_perfil ().subscribe (async (res: any) => {
    //   console.log (res);
    //   loading.dismiss ();
    //   if (res.total < 100) {
    //     this.complete_profile_modal ();
    //   } else {
    //     this.navController.navigateForward (['edit-profile']);
    //   }
    // }, error => {
    //   loading.dismiss ();
    //   console.log (error);
    // });

    this.navController.navigateForward (['edit-profile']);
  }

  async complete_profile_modal () {
    const modal = await this.modalController.create ({
      component: CompleteProfilePage,
      swipeToClose: true,
      // presentingElement: this.routerOutlet.nativeEl,
      mode: 'ios'
    });

    modal.onDidDismiss ().then ((response: any) => {
      if (response.role === 'update') {
        
      }
    });

    return await modal.present ();
  }

  async logout () {
    const alert = await this.alertController.create({
      header: 'Cerrar sesión',
      message: '¿Está seguro que desea cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel'
        }, {
          text: 'Si',
          handler: async () => {
            const loading = await this.loadingCo1ntroller.create({
              translucent: true,
              spinner: 'lines-small',
              mode: 'ios'
            });

            await loading.present ();

            this.auth.logout ().subscribe (async (res: any) => {
              await loading.dismiss ();
              this.borrar_user_access ();
              this.auth.logout_social ();
            }, async error => {
              await loading.dismiss ();
              this.borrar_user_access ();
              this.auth.logout_social ();
            });
          }
        }
      ]
    });

    await alert.present();
  }

  borrar_user_access () {
    this.storage.clear ().then (() => {
      this.navController.navigateRoot ('login');
    });
  }

  go_page (page: string) {
    this.navController.navigateForward ([page]);
  }

  async open_upgrade_menu () {
    this.database.open_upgrade_menu ();
  }

  open_select_plan () {
    this.database.open_select_plan ();
  }

  open_buy_credis () {
    this.database.open_buy_credis ();
  }
}
