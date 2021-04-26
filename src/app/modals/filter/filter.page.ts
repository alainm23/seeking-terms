import { Component, OnInit, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  @Input () order_by: string;
  @Input () page: string;
  constructor (private modalController: ModalController) { }

  ngOnInit() {
  }

  close () {
    this.modalController.dismiss (null, 'close');
  }

  filter () {
    this.modalController.dismiss ({
      order_by: this.order_by
    }, 'filter');
  }
}
