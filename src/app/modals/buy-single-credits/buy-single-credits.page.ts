import { Component, OnInit } from '@angular/core';

// Services
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-buy-single-credits',
  templateUrl: './buy-single-credits.page.html',
  styleUrls: ['./buy-single-credits.page.scss'],
})
export class BuySingleCreditsPage implements OnInit {
  prices: any [] = [
    {
      text: '20 Credits',
      value: 19.99,
      creditos: 20
    },
    {
      text: '50 Credits',
      value: 49.99,
      creditos: 50
    },
    {
      text: '100 Credits',
      value: 99.99,
      creditos: 100
    },
    {
      text: '200 Credits',
      value: 149.99,
      creditos: 200
    }
  ]
  constructor (private modalController: ModalController) { }

  ngOnInit() {
  }

  select_price (item: any) {
    this.modalController.dismiss (item, 'ok');
  }
}
