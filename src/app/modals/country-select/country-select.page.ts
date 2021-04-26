import { Component, OnInit } from '@angular/core';

// Services
import { LoadingController, ModalController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';


@Component({
  selector: 'app-country-select',
  templateUrl: './country-select.page.html',
  styleUrls: ['./country-select.page.scss'],
})
export class CountrySelectPage implements OnInit {
  items: any [] = [];
  _items: any [] = [];
  constructor (private modalController: ModalController, public database: DatabaseService,
    private loadingController: LoadingController) { }

  async ngOnInit() {
    if (this.database.PAISES.length <= 0) {
      const loading = await this.loadingController.create ({
        message: 'Procesando...'
      });
  
      await loading.present ();
  
      this.database.get_paises ().subscribe ((res: any) => {
        console.log (res);
        this.database.PAISES = res.data;

        this.items = res.data;
        this._items = res.data;

        loading.dismiss ();
      }, error => {
        console.log (error);
        loading.dismiss ();
      });
    } else {
      this.items = this.database.PAISES;
      this._items = this.database.PAISES;
    }
  }

  back () {
    this.modalController.dismiss (null, 'close');
  }

  select (item: any) {
    this.modalController.dismiss (item, 'data');
  }

  filter (event: any) {
    console.log (event);
    this.items = this._items;
    if (event.detail.value.trim () !== '') {
      this.items = this.items.filter ((item: any) => {
        return item.name.toLowerCase ().indexOf (event.detail.value.toLowerCase ()) > -1; 
      });
    }
  }
}
