import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  URL: string;
  URL_STORAGE: string;
  PAISES: any [] = [];
  constructor (public http: HttpClient,
    public auth: AuthService) { 
    this.URL = 'https://seekingterms.com/api/';
    this.URL_STORAGE ='https://www.seekingterms.com/storage/';
  }

  get_datos (tipo: string) {
    let url = this.URL + 'datos/' + tipo;
    return this.http.get (url);
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
}
