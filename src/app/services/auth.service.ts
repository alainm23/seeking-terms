import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { Storage } from '@ionic/storage-angular';
import { GooglePlus } from '@ionic-native/google-plus/ngx';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook/ngx';
import { Clipboard } from '@ionic-native/clipboard/ngx';
import { LoadingController, NavController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  USER_ACCESS: any = {};
  USER_DATA: any = {
    foto_perfil: ''
  };
  URL: string;
  constructor (public http: HttpClient, private storage: Storage,
    private googlePlus: GooglePlus, private fb: Facebook,
    private clipboard: Clipboard,
    private loadingController: LoadingController,
    private navController: NavController) {
    this.URL = 'https://seekingterms.com/api/auth/';
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

    formData.append ('pais', request.pais);
    formData.append ('id_region', request.id_region);
    formData.append ('id_ciudad', request.id_ciudad);
    formData.append ('nombre_ciudad', request.nombre_ciudad);
    formData.append ('nombre_region', request.nombre_region);
    formData.append ('latitud', request.latitud);
    formData.append ('longitud', request.longitud);
    formData.append ('year', request.year);
    formData.append ('month', request.month);
    formData.append ('day', request.day);
    formData.append ('imagen', request.imagen.file, request.imagen.name);

    for (let i = 0; i < request.relaciones.length; i++) {
      formData.append ('relaciones[]', request.relaciones [i]);
    }

    for (let i = 0; i < request.generos_interes.length; i++) {
      formData.append ('generos_interes[]', request.generos_interes [i]);
    }

    for (let i = 0; i < galeria.length; i++) {
      formData.append ('galeria[]', galeria [i].file, galeria [i].name);
    }

    return this.http.post (url, formData);
  }

  async save_local_user (request: any) {
    this.USER_ACCESS = {
      access_token: request.access_token,
      expires_at: request.expires_at
    };

    this.USER_DATA = request.user;

    await this.storage.set ('USER_ACCESS', JSON.stringify (this.USER_ACCESS));
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
          this.navController.navigateForward (['registro', res.user.id]);
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
          this.navController.navigateForward (['registro', res.user.id]);
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
    
    return this.http.post ('https://seekingterms.com/api/auth/login/social', request);
  }
}
