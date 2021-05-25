import { Component, OnInit } from '@angular/core';

// Services
import { DatabaseService } from '../../services/database.service';
import { ChatPage } from '../../modals/chat/chat.page';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.page.html',
  styleUrls: ['./inbox.page.scss'],
})
export class InboxPage implements OnInit {
  page: number = 0;
  is_loading: boolean = false;
  items: any [] = [];
  constructor (private database: DatabaseService,
    private modalController: ModalController) { }

  ngOnInit () {
    this.is_loading = true;
    this.get_data (null, false);
  }

  get_data (event: any, join: boolean) {
    this.page = this.page + 1;
    this.database.get_chats (this.page).subscribe ((res: any []) => {
      console.log (res);

      if (join) {
        res.forEach ((e: any) => {
          this.items.push (e);
        });
      } else {
        this.items = res;
      }

      if (event === null) {
        this.is_loading = false;
      } else {
        event.target.complete ();
      }
    }, error => {
      console.log (error);
      if (event === null) {
        this.is_loading = false;
      } else {
        event.target.complete ();
      }
    });
  }

  async view_chat (item: any) {
    console.log (item);

    const modal = await this.modalController.create({
      component: ChatPage,
      componentProps: {
        chat_id: item.id,
        perfil: item.receptor
      }
    });

    return await modal.present ();
  }

  async open_upgrade_menu () {
    this.database.open_upgrade_menu ();
  }
}
