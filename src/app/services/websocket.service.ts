import { Injectable } from '@angular/core';

// Services
import Echo from 'laravel-echo';
import Channel from 'laravel-echo';
import { environment } from '../../environments/environment';
import Pusher from 'pusher-js';
import { ModalController, ToastController } from '@ionic/angular';
import { ChatPage } from '../modals/chat/chat.page';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public user_id: string;
  public token: string;
  public echo: Echo = null;
  public current_chat_opened: number = 0;
  constructor (public toastController: ToastController,
    private modalController: ModalController) {

  }

  init_websocket (user_id: string, token: string) {
    if (this.echo === null) {
      this.user_id = user_id;
      this.token = token;

      this.echo = new Echo ({
        broadcaster: 'pusher',
        key: environment.websocket.PUSHER_APP_KEY,
        wsHost: environment.websocket.PUSHER_APP_HOST,
        cluster: environment.websocket.PUSHER_APP_CLUSTER,
        authEndpoint: 'https://seekingterms.com/api/broadcasting/auth',
        auth: {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
          }
        },
        wsPort: 8443,
        wssPort: 8443,
        forceTLS: true,
        disableStats: true,
        enabledTransports: ['ws', 'wss'],
        encrypted: true
      });

      this.echo.channel ('private-chat.' + user_id).listen ('.message', (res: any) => {
        if (this.current_chat_opened !== res.chat.id) {
          this.present_notify ('New Message', res.message.message, res);
          console.log ('MessageEvent', res);
        }
      });
    }
  }

  create_channel () {
    return this.echo.channel ('private-chat.' + this.user_id);
  }

  async present_notify (header: string, message: string, data: any) {
    const toast = await this.toastController.create ({
      header: header,
      message: message,
      duration: 3500,
      position: 'top',
      buttons: [
        {
          text: 'View',
          handler: async () => {
            const modal = await this.modalController.create({
              component: ChatPage,
              componentProps: {
                id: data.chat.id,
                receptor: {}
              }
            });
        
            return await modal.present ();
          }
        }
      ]
    });

    return toast.present ();
  }
}
