import { Component, OnInit } from '@angular/core';

// Services
import { DatabaseService } from '../../services/database.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-edit-fotos',
  templateUrl: './edit-fotos.page.html',
  styleUrls: ['./edit-fotos.page.scss'],
})
export class EditFotosPage implements OnInit {

  constructor (private auth: AuthService,
    private database: DatabaseService) { }

  ngOnInit () {
    this.auth.get_fields (['galeria', 'imagen']).subscribe ((res: any) => {      
      console.log (res);
    });
  }
}
