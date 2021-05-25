import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import  * as moment from 'moment';

@Component({
  selector: 'app-purchase-message',
  templateUrl: './purchase-message.page.html',
  styleUrls: ['./purchase-message.page.scss'],
})
export class PurchaseMessagePage implements OnInit {
  id: string;
  data: any;
  constructor (private route: ActivatedRoute, private navController: NavController) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');
    this.data = JSON.parse (this.route.snapshot.paramMap.get ('data'));
    console.log (this.id);
    console.log (this.data);
  }

  validar_direccion () {
    if (this.id === 'null') {
      this.navController.navigateRoot ('verify-email');
    } else {
      this.navController.navigateRoot ('home');
    }
  }

  get_current_data () {
    return moment ().format ('LLL');
  }
}
