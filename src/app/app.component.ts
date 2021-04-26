import { Component, OnInit } from '@angular/core';

// Services
import { Storage } from '@ionic/storage';
import * as moment from 'moment';
import Echo from 'laravel-echo';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor (private storage: Storage) {
    this.storage.create ();
    moment.locale ('en');
    this.OnInit ();
  }

  OnInit () {
    // const echo1 = new Echo ()
  }
}
