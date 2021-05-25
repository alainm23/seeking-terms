import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

// Services
import { Storage } from '@ionic/storage-angular';
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
        
        if (this.auth.USER_DATA.email_verified_at === null) {
          this.navController.navigateRoot ('verify-email');
        }

        return true;
      } else {
        this.navController.navigateRoot ('login');
        return false;
      }
    });
  }
}