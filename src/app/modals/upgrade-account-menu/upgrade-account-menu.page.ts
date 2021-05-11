import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service'; 

@Component({
  selector: 'app-upgrade-account-menu',
  templateUrl: './upgrade-account-menu.page.html',
  styleUrls: ['./upgrade-account-menu.page.scss'],
})
export class UpgradeAccountMenuPage implements OnInit {

  constructor (private modalController: ModalController,
    public auth: AuthService) { }

  ngOnInit() {
  }

  event (event: any) {
    this.modalController.dismiss (null, event);
  }
}
