import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { LoadingController, NavController } from '@ionic/angular';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_ACCESS: any = {};
  USER_DATA: any = {
    foto_perfil: ''
  };
  URL: string;
  private user_subject = new Subject<any> ();
  constructor (public http: HttpClient, private storage: Storage,
    private googlePlus: GooglePlus, private fb: Facebook,
    private clipboard: Clipboard,
    private loadingController: LoadingController,
    private navController: NavController) {
    this.URL = 'https://seekingterms.com/api/auth/';
  }

  usuario_changed (data: any) {
    this.user_subject.next (data);
  }

  get_user_observable (): Subject<any> {
    return this.user_subject;
  }

  login (email: string, password: string) {
    let url = this.URL + 'login';
    return this.http.post (url, {email: email, password: password});
  }

  logout () {
    let url = this.URL + 'logout';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  async logout_social () {
    await this.googlePlus.logout ();
    await this.fb.logout (); 
  }

  validar_campo (request: any) {
    let url = this.URL + 'validar/campo/usuario';
    return this.http.post (url, request);
  }

  save_settings_all (request: any) {
    let url = 'https://seekingterms.com/api/users/user/settings/set/all';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  save_settings (request: any) {
    let url = 'https://seekingterms.com/api/users/user/settings/set';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.post (url, request, { headers });
  }

  registro (request: any) {
    let url = this.URL + 'registro';

    let galeria: any [] = [];
    request.galeria.forEach ((file: any) => {
      if (file !== null) {
        galeria.push (file);
      }
    });

    const formData: FormData = new FormData ();
    formData.append ('usernick', request.usernick);
    formData.append ('sexo', request.sexo);

    if (request.id === 0) {
      formData.append ('email', request.email);
      formData.append ('password', request.password);
    } else {
      formData.append ('id', request.id);
      formData.append ('social', request.social);
    }

    formData.append ('ciudad', request.ciudad);
    formData.append ('pais', request.pais);
    formData.append ('pais_codigo', request.pais_codigo);
    formData.append ('latitud', request.latitud);
    formData.append ('longitud', request.longitud);
    formData.append ('year', request.year);
    formData.append ('month', request.month);
    formData.append ('day', request.day);
    formData.append ('imagen', request.imagen.file, request.imagen.name);

    for (let i = 0; i < request.referencias.length; i++) {
      formData.append ('referencias[]', request.referencias [i]);
    }

    for (let i = 0; i < request.relaciones.length; i++) {
      formData.append ('relaciones[]', request.relaciones [i]);
    }

    for (let i = 0; i < request.generos_interes.length; i++) {
      formData.append ('generos_interes[]', request.generos_interes [i]);
    }

    for (let i = 0; i < galeria.length; i++) {
      formData.append ('galeria[]', galeria [i].file, galeria [i].name);
    }

    formData.forEach ((value: any, key: any) => {
      console.log ('Key: ', key);
      console.log ('Value: ', value);
      console.log ('-----------------------')
    });

    return this.http.post (url, formData);
  }

  async save_local_user (request: any) {
    this.USER_ACCESS = {
      access_token: request.access_token,
      expires_at: request.expires_at
    };

    this.USER_DATA = request.user;

    await this.storage.set ('USER_ACCESS', JSON.stringify (this.USER_ACCESS));
    this.usuario_changed ({USER_ACCESS: this.USER_ACCESS, USER_DATA: this.USER_DATA});
    return await this.storage.set ('USER_DATA', JSON.stringify (this.USER_DATA));
  }

  get_settings () {
    let url = 'https://seekingterms.com/api/users/user/settings/get';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  async google () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();
    
    this.googlePlus.login ({}).then (async (request: any) => { 
      this.login_social (request.userId, 'Google', request.displayName, request.email).subscribe ((res: any) => {-
        loading.dismiss ();
        if (res.user.registro_incompleto === 1) {
          this.navController.navigateForward (['request-gps', res.user.id]);
        } else {
          this.save_local_user (res).then (() => {
            this.navController.navigateRoot ('home');
          });
        }
      }, error => {
        loading.dismiss ();
        alert (JSON.stringify (error));
      });
    }, error => {
      loading.dismiss ();
      alert (JSON.stringify (error));
    });
  }

  get_user () {
    let url = 'https://seekingterms.com/api/auth/user';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  delete_account () {
    let url = 'https://seekingterms.com/api/auth/delete/account';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.get (url, { headers });
  }

  async facebook () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.fb.getLoginStatus ().then (async (res) => {
      if (res.status === 'connected') {
        await this.fb.logout ();
      }

      this.fb.login (['public_profile']).then ((response: FacebookLoginResponse) => {
        this.get_facebook_profile (loading);
      }, (error) => {
        loading.dismiss ();
        alert (JSON.stringify (error));
      });
    }, error => {
      loading.dismiss ();
      alert (JSON.stringify (error));
    });
  }

  get_facebook_profile (loading: any) {
    this.fb.api ('me?fields=id,name,email,first_name,last_name,picture.width(720).height(720).as(picture_large)', []).then (async (request: any) => {
      this.login_social (request.id, 'Facebook', request.first_name, '').subscribe ((res: any) => {
        loading.dismiss ();
        if (res.user.registro_incompleto === 1) {
          this.navController.navigateForward (['request-gps', res.user.id]);
        } else {
          this.save_local_user (res).then (() => {
            this.navController.navigateRoot ('home');
          });
        }
      }, error => {
        loading.dismiss ();
        alert (JSON.stringify (error));
      });
    }, error => {
      loading.dismiss ();
      alert (JSON.stringify (error));
    });
  }

  login_social (provider_id: string, tipo: string, name: string, email: string) {
    let request: any = {
      provider_id: provider_id,
      tipo: tipo,
      name: name,
      email: email
    };

    console.log (request);
    
    return this.http.post ('https://seekingterms.com/api/auth/login/social', request);
  }
  
  get_fields (fields: any []) {
    let url = 'https://seekingterms.com/api/auth/get/specifics/fields/user';

    const headers = {
      'Authorization': 'Bearer ' + this.USER_ACCESS.access_token
    }

    return this.http.post (url, {fields: fields}, { headers });
  }
}
