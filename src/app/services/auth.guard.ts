import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { Storage } from '@ionic/storage';
import { AuthService } from '../services/auth.service';
import { NavController } from '@ionic/angular';
import { WebsocketService } from '../services/websocket.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor (
    private storage: Storage,
    private auth: AuthService,
    private navController: NavController,
    private websocket: WebsocketService) {}
  canActivate () {
    return this.storage.get ('USER_ACCESS').then (async (user: any) => {
      if (user !== null) {
        this.auth.USER_ACCESS = JSON.parse (user);
        this.auth.USER_DATA = JSON.parse (await this.storage.get ('USER_DATA'));

        console.log (this.auth.USER_DATA);
        this.websocket.init_websocket (this.auth.USER_DATA.id, this.auth.USER_ACCESS.access_token);
        
        return true;
      } else {
        this.navController.navigateRoot ('login');
        return false;
      }
    });
  }
}