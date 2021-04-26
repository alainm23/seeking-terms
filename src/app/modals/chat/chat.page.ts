import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

//Services
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';
import * as moment from 'moment';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.page.html',
  styleUrls: ['./chat.page.scss'],
})
export class ChatPage implements OnInit {
  @Input () id: any;
  receptor: any;
  message: string = '';
  messages: any [] = [];
  constructor (private database: DatabaseService,
    private modalController: ModalController,
    public auth: AuthService) { }

  ngOnInit() {
    console.log (this.id);
    this.database.get_chat (this.id).subscribe ((res: any) => {
      console.log (res);
      this.messages = res.mensajes;
      this.receptor = res.receptor;
    }, error => {
      console.log (error);
    });
  }

  close () {
    this.modalController.dismiss (null, 'close');
  }

  send_message () {
    if (this.message.trim () != "") {
      this.database.send_message (this.receptor.id, this.message).subscribe ((res: any) => {
        console.log (res);
      }, error => {
        console.log (error);
      });
    }
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
