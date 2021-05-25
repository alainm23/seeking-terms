import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ModalController, IonContent, IonInfiniteScroll } from '@ionic/angular';

//Services
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @ViewChild (IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;
  @ViewChild ('content') private content: any;
  @Input () chat_id: any;
  @Input () perfil: any;
  
  id_sender: string;
  id_recipient: string;

  message: string = '';
  messages: any [] = [];
  page: number = 0;
  is_loading: boolean = false;
  
  constructor (private database: DatabaseService,
    private modalController: ModalController,
    public auth: AuthService,
    public websocket: WebsocketService) { }

  ngOnInit () {
    
  }

  ionViewDidEnter () {
    this.websocket.current_chat_opened = this.chat_id;
    this.infiniteScroll.disabled = true;

    this.id_recipient = this.perfil.id;
    this.id_sender = this.auth.USER_DATA.id;

    console.log ('id_recipient', this.id_recipient);
    console.log ('id_sender', this.id_sender);
    
    this.get_data (null, false);

    this.database.ver_mensajes_vistos (this.chat_id).subscribe ((res: any) => {
      console.log (res);
    }, error => {

    });
  }

  ionViewDidLeave () {
    this.websocket.current_chat_opened = 0;
  }

  get_data (event: any, join: boolean) {
    this.page++;
    this.database.get_chat (this.chat_id, this.page).subscribe ((res: any []) => {
      // console.log (res);
      if (join) {
        res.forEach ((e: any) => {
          this.messages.unshift (e);
        });

        if (res.length < 15) {
          event.target.disabled = true;
        }
      } else {
        this.messages = res.reverse ();
      }

      console.log (this.messages);

      if (event === null) {
        setTimeout (() => {
          this.content.scrollToBottom ();
          setTimeout (() => {
            this.infiniteScroll.disabled = false;
          }, 250);
        }, 300);
        this.init_channel ();
      } else {
        event.target.complete ();
      }
    }, error => {
      console.log (error);
    });
  }

  close () {
    this.modalController.dismiss (null, 'close');
  }

  format_message (message: string) {
    if (message === 'wink') {
      return '😉️';
    }

    return message;
  }

  send_message () {
    if (this.message.trim () != "") {
      let message = new String (this.message);
      this.is_loading = true;

      this.messages.push ({
        created_at: new Date ().toISOString (),
        id: -1,
        id_chat: this.chat_id,
        id_recipient: this.id_recipient,
        id_sender: this.id_sender,
        message: this.format_message (this.message),
        updated_at: new Date ().toISOString (),
        visto: 0
      });
      this.message = '';
      this.scrollToBottom ();
      
      this.database.send_message (this.perfil.id, message).subscribe ((res: any) => {
        this.is_loading = false;
        console.log (res);
        if (res.status === false) {
          
        }
      }, error => {
        this.is_loading = false;
        console.log (error);
      });
    }
  }

  scrollToBottom () {
    setTimeout (() => {
      this.content.scrollToBottom (250);
    }, 250);
  }

  init_channel () {
    this.websocket.create_channel ().listen ('.message', (res: any) => {
      console.log (res);
      if (res.chat.id === this.chat_id) {
        this.messages.push (res.message);
        this.scrollToBottom ();
      }
    });
  }

  get_date_format (date: string) {
    if (date === null || date === undefined || date === '') {
      return '';
    }

    let datetime: moment.Moment = moment (date);

    if (datetime.isSame (moment (), 'day')) {
      return moment (date).format ('LT');
    } else if (datetime.isSame (moment (), 'year')) {
      return moment (date).format ('DD [de] MM HH:MM');
    } else {
      return moment (date).format ('lll');
    }
  }
}
