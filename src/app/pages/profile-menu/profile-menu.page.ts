import { Component, OnInit } from '@angular/core';

// Services
import { ModalController, NavController, LoadingController, AlertController } from '@ionic/angular';
import { CompleteProfilePage } from '../../modals/complete-profile/complete-profile.page';
import { IonRouterOutlet } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';
import { AuthService } from 'src/app/services/auth.service';
import { Storage } from '@ionic/storage';

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
    
  }

  async complete_profile () {
    const loading = await this.loadingController.create ({
      message: ''
    });

    await loading.present ();

    this.database.get_porcentaje_perfil ().subscribe (async (res: any) => {
      loading.dismiss ();
      console.log (res);
      this.complete_perfil = res;

      if (this.complete_perfil.total < 95) {
        const modal = await this.modalController.create ({
          component: CompleteProfilePage,
          swipeToClose: true,
          presentingElement: this.routerOutlet.nativeEl,
          mode: 'ios'
        });
    
        modal.onDidDismiss ().then ((response: any) => {
          if (response.role === 'update') {
            
          }
        });
    
        return await modal.present ();
      } else {
        
      }
    }, error => {
      console.log (error);
    });
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
              message: 'Procesando...'
            });

            await loading.present ();

            this.auth.logout ().subscribe (async (res: any) => {
              await loading.dismiss ();
              this.borrar_user_access ();
            }, async error => {
              await loading.dismiss ();
              this.borrar_user_access ();
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
}
