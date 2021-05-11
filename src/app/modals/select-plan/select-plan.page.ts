import { Component, OnInit, Input } from '@angular/core';

// Services
import { LoadingController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-select-plan',
  templateUrl: './select-plan.page.html',
  styleUrls: ['./select-plan.page.scss'],
})
export class SelectPlanPage implements OnInit {
  @Input () page: string; 
  planes: any [] = [];
  slideOpts = {
    initialSlide: 2,
    slidesPerView: 1.2,
    spaceBetween: 12,
  };
  constructor (private modalController: ModalController,
    private database: DatabaseService,
    private loadingController: LoadingController) { }
  
  async ngOnInit () {
    console.log (this.page);
    
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.database.get_datos ('planes').subscribe ((res: any []) => {
      console.log (res);
      this.planes = res;
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  select_plan (plan: string, item: any=null) {
    this.modalController.dismiss (item, plan);
  }
}
