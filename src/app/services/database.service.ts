import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
import { LoadingController, ModalController, NavController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';

import { UpgradeAccountMenuPage } from '../modals/upgrade-account-menu/upgrade-account-menu.page';
import { SelectPlanPage } from '../modals/select-plan/select-plan.page';
import { BuySingleCreditsPage } from '../modals/buy-single-credits/buy-single-credits.page';
import { PaymentPage } from '../modals/payment/payment.page';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  URL: string;
  URL_STORAGE: string;
  PAISES: any [] = [];
  RELACIONES: any [] = [];
  PERSONALIDADES: any [] = [];
  APARIENCIAS: any [] = [];
  IDIOMAS: any [] = [];
  EXTRAS: any [] = [];
  constructor (public http: HttpClient,
    public auth: AuthService,
    public modalController: ModalController,
    public loadingController: LoadingController,
    private storage: Storage,
    private navController: NavController) { 
    this.URL = 'https://seekingterms.com/api/';
    this.URL_STORAGE ='https://www.seekingterms.com/storage/';
  }

  get_datos (tipo: string, lang: string="en") {
    let url = this.URL + 'datos/' + tipo;

    return this.http.get (url, { params: { lang: lang }});
  }

  get_paises () {
    let url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries?limit=200';
    
    const headers = {
      'x-rapidapi-key': '69df8b3fadmsha663ca613d764dap162f59jsn1fcbba3a8651',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }

    return this.http.get (url, { headers });
  }

  get_regions (pais_id: string) {
    let url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/' + pais_id + '/regions?limit=200';
    
    const headers = {
      'x-rapidapi-key': '69df8b3fadmsha663ca613d764dap162f59jsn1fcbba3a8651',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }

    return this.http.get (url, { headers });
  }

  get_cities (pais_id: string, region_id: string) {
    let url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries/' + pais_id + '/regions/' + region_id + '/cities?limit=250';
    
    const headers = {
      'x-rapidapi-key': '69df8b3fadmsha663ca613d764dap162f59jsn1fcbba3a8651',
      'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
    }

    return this.http.get (url, { headers });
  }

  valid_photo (FormData: FormData) {
    let url = 'https://seekingterms.com/api/auth/validar/campo/usuario';
    return this.http.post (url, FormData);
  }

  get_home_profiles (request: any) {
    let url = this.URL + 'users/home ';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  get_home_promovidos () {
    let url = this.URL + 'users/promovidos';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }
    
    return this.http.get (url, { headers });
  }

  get_profile_data (id: string) {
    let url = this.URL + 'users/user/' + id;

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  set_favorite (id_user: string) {
    let url = this.URL + 'users/user/add/favorite';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {id_user: id_user}, { headers });
  }

  send_wink (id_user: string) {
    let url = this.URL + 'chats/send/wink';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {id_user: id_user}, { headers });
  }

  get_chats (page: number) {
    let url = this.URL + 'chats/all/' + page;

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  send_message (id_user: string, message: any) {
    let url = this.URL + 'chats/send/message';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {id_user: id_user, message: message}, { headers });
  }

  get_chat (id_chat: string, page: number) {
    let url = this.URL + 'chats/messages/' + id_chat + '/' + page;

    console.log (url);

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  get_favoritos (request: any) {
    let url = this.URL + 'users/favoritos';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  get_porcentaje_perfil () {
    let url = this.URL + 'users/user/porcentaje/perfil';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  get_data_faltante () {
    let url = this.URL + 'users/user/data/faltante';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  save_step_modal (request: any) {
    let url = this.URL + 'users/user/save/step/modal';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  guardar_pago_creditos (request: any) {
    let url = this.URL + 'users/user/guardar/creditos/compra';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  guardar_membresia (request: any) {
    let url = this.URL + 'users/user/guardar/membresia/compra';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  cancelar_mebresia () {
    let url = this.URL + 'users/user/cancelar/membresia';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {}, { headers });
  }

  async open_upgrade_menu () {
    const modal = await this.modalController.create ({
      component: UpgradeAccountMenuPage,
      swipeToClose: true,
      cssClass: 'modal-verify',
      showBackdrop: false,
      mode: 'ios'
    });

    modal.onDidDismiss ().then ((response: any) => {
      if (response.role === 'upgrade') {
        this.open_select_plan ();
      } else if (response.role === 'credits') {
        this.open_buy_credis ();
      }
    });

    return await modal.present ();
  }

  async open_select_plan () {
    const modal = await this.modalController.create({
      component: SelectPlanPage,
      componentProps: {
        gender: 0
      }
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'free') {
        
      } else if (response.role === 'free-spirit') {
        this.open_buy_credis ();
      } else if (response.role === 'subscription') {
        this.open_payment (response.data, 'subscription');
      }
    });
    
    return await modal.present ();
  }

  async open_buy_credis () {
    const modal = await this.modalController.create ({
      component: BuySingleCreditsPage,
      componentProps: {
        page: 'home'
      }
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'ok') {
        this.open_payment (response.data, 'credis');
      }
    });
    
    return await modal.present ();
  }

  async open_payment (data: any, type: string) {
    const modal = await this.modalController.create ({
      component: PaymentPage,
      componentProps: {
        data: data,
        type: type
      }
    });

    modal.onWillDismiss ().then (async (response: any) => {
      if (response.role === 'PAID') {
        const loading = await this.loadingController.create ({
          translucent: true,
          spinner: 'lines-small',
          mode: 'ios'
        });
    
        await loading.present ();

        if (response.data.type === 'credis') {
          let request: any = {
            creditos: response.data.data.creditos,
            codigo_transaccion: response.data.response.id,
            total_pagado: response.data.data.value
          };
  
          console.log (request);
  
          this.guardar_pago_creditos (request).subscribe (async (res: any) => {
            if (res.status === true) {
              this.auth.USER_DATA.creditos += request.creditos;
              this.storage.set ('USER_DATA', JSON.stringify (this.auth.USER_DATA)).then (() => {
                loading.dismiss ();
                this.navController.navigateRoot (['purchase-message', 'home', JSON.stringify (response.data)]);
              });
            } 
          }, error => {
            loading.dismiss ();
            console.log (error);
          });
        } else {
          let request: any = {
            id_plan: response.data.data.id,
            codigo_transaccion: response.data.response.orderID,
            id_suscripcion: response.data.response.subscriptionID
          };

          this.guardar_membresia (request).subscribe ((res: any) => {
            if (res.status === true) {
              this.auth.USER_DATA.membresia = request.id_plan;
              this.storage.set ('USER_DATA', JSON.stringify (this.auth.USER_DATA)).then (() => {
                loading.dismiss ();
                this.navController.navigateRoot (['purchase-message', 'home', JSON.stringify (response.data)]);
              });
            } 
          }, error => {
            console.log (error);
            loading.dismiss ();
          });
          console.log (response);
        }
      }
    });
    
    return await modal.present ();
  }

  save_onesignal_player_id (player_id: string) {
    let url = this.URL + 'auth/new/player/id';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {onesignal_player_id: player_id}, { headers });
  }

  ver_mensajes_vistos (id_chat: string) {
    let url = this.URL + 'chats/marcar/mensajes/vistos';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, {id_chat: id_chat}, { headers });
  }

  perfil_visitado (id: string) {
    let url = this.URL + 'users/user/visit/profile';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.get (url, {headers: headers, params: {id: id}});
  }

  edit_profile (request: any) {
    let url = this.URL + 'users/user/profile/edit';

    const headers = {
      'Authorization': 'Bearer ' + this.auth.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }
}
