import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

// Services
import { DatabaseService } from '../../services/database.service';
import { FilterPage } from '../../modals/filter/filter.page';
import * as moment from 'moment';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {
  items: any [] = [];
  home_loading: boolean = false;
  page: number = 0;
  tab_filter: string = null;
  order_by: string = 'date-desc';
  seccion: string = 'favoritos';

  constructor (private database: DatabaseService,
    private modalController: ModalController) { }

  ngOnInit () {
    this.home_loading = true;
    this.get_data (null, false, '');
  }

  get_data (event: any, join: boolean, type: string) {
    if (type === 'refresher') {
      event.target.disabled = false;
      this.page = 1;
    } else if (type === 'infinite-scroll') {
      this.page = this.page + 1;
    } else {
      this.page = this.page + 1;
    }
    
    this.database.get_favoritos (this.get_filter_data ()).subscribe ((res: any []) => {
      console.log (res);
      if (join) {
        res.forEach ((e: any) => {
          this.items.push (e);
        });

        if (type === 'infinite-scroll' && res.length < 15) {
          event.target.disabled = true;
        }
      } else {
        this.items = res;
      }

      if (event === null) {
        this.home_loading = false;
      } else {
        event.target.complete ();
      }
    }, error => {
      console.log (error);
      if (event === null) {
        this.home_loading = false;
      } else {
        event.target.complete ();
      }
    });
  }

  set_tab (filter: string) {
    this.items = [];
    this.page = 0;
    this.tab_filter = filter;
    this.home_loading = true;
    this.get_data (null, false, '');
  }

  get_filter_data () {
    let request: any = {
      page: this.page,
      orden: this.order_by,
      tab: this.tab_filter,
      seccion: this.seccion
    };

    console.log (request);

    return request;
  }

  async filtrar () {
    const modal = await this.modalController.create ({
      component: FilterPage,
      componentProps: {
        page: 'favorite',
        order_by: this.order_by
      }
    });

    modal.onDidDismiss ().then ((response: any) => {
      if (response.role === 'filter') {
        this.order_by = response.data.order_by;
        this.items = [];
        this.page = 0;
        this.home_loading = true;
        this.get_data (null, false, '');
      }
    });

    return await modal.present ();
  }

  section_changed (event: any) {
    this.items = [];
    this.page = 0;
    this.tab_filter = event.detail.value;
    this.home_loading = true;
    this.get_data (null, false, '');
  }

  get_relative_format (date_string: string) {
    if (date_string === null || date_string === undefined || date_string === '') {
      return '';
    }

    let date = moment (date_string);

    if (!date.isValid ()) {
      return '';
    }

    return date.fromNow ();
  }
}
