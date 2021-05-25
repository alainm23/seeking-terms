import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Services
import { AuthService } from '../../services/auth.service';
import { EditProfileFormPage }from '../../modals/edit-profile-form/edit-profile-form.page';
import { EditFotosPage } from '../../modals/edit-fotos/edit-fotos.page';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.page.html',
  styleUrls: ['./edit-profile.page.scss'],
})
export class EditProfilePage implements OnInit {
  profile: any = {};
  galeria: any [] = [];
  constructor (private auth: AuthService, private modalController: ModalController) { }

  ngOnInit() {
    this.auth.get_user ().subscribe ((res: any) => {
      console.log (res);
      this.profile = res;

      this.galeria.push ({
        imagen: res.foto_perfil
      });

      if (res.galeria !== undefined && res.galeria !== null) {
        this.galeria = this.galeria.concat (res.galeria);
      }
    }, error => {
      console.log (error);
    });


    this.profile = this.auth.USER_DATA;
    // console.log (this.profile);
  }

  async edit_modal (form: string) {
    if (form === 'galeria') {
      const modal = await this.modalController.create ({
        component: EditFotosPage,
        swipeToClose: true,
        mode: 'ios'
      });
  
      modal.onDidDismiss ().then ((response: any) => {
        if (response.role === 'update') {
          
        }
      });
  
      return await modal.present ();
    } else {
      const modal = await this.modalController.create ({
        component: EditProfileFormPage,
        componentProps: {
          form: form
        },
        swipeToClose: true,
        mode: 'ios'
      });
  
      modal.onDidDismiss ().then ((response: any) => {
        if (response.role === 'update') {
          
        }
      });
  
      return await modal.present ();
    }
  }
}
