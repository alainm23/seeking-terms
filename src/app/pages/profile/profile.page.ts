import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LoadingController } from '@ionic/angular';

// Services
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {
  id: string;
  profile: any = {};
  galeria: any [] = [];

  slideOpts = {
    autoplay: true,
    initialSlide: 0,
    speed: 400,
    pagination: {
      el: '.swiper-pagination',
      dynamicBullets: true,
    },
  };
  constructor (private database: DatabaseService,
    private route: ActivatedRoute,
    private loadingController: LoadingController) { }

  async ngOnInit () {
    this.id = this.route.snapshot.paramMap.get ('id');

    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.database.get_profile_data (this.id).subscribe ((res: any) => {
      console.log (res);
      this.galeria.push ({
        imagen: res.foto_perfil
      });
      this.galeria = this.galeria.concat (res.galeria);
      this.profile = res;
      loading.dismiss ();
    }, error => {
      console.log (error);
      loading.dismiss ();
    });
  }
}
