import { Component, OnInit, Input } from '@angular/core';

// Services
import { ModalController } from '@ionic/angular';
import { DatabaseService } from '../../services/database.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {
  // @Input () order_by: string;
  @Input () page: string;
  @Input () relationship: any;
  @Input () idiomas: any;
  @Input () personalidad_map: Map <string, number []> = new Map <string, number []> ();
  @Input () apariencia_map: Map <string, number []> = new Map <string, number []> ();
  @Input () extra_map: Map <string, number []> = new Map <string, number []> ();
  @Input () edad_range: number;
  constructor (private modalController: ModalController,
    public database: DatabaseService) { }

  ngOnInit () {
    if (this.database.RELACIONES.length <= 0)  {
      this.database.get_datos ('relaciones').subscribe ((res: any) => {
        this.database.RELACIONES = res;
        // console.log (res);
      }, error => {
        console.log (error);
      });
    }
    
    if (this.database.IDIOMAS.length <= 0) {
      this.database.get_datos ('idiomas').subscribe ((res: any) => {
        this.database.IDIOMAS = res;
        console.log (res);
      }, error => {
        console.log (error);
      });
    }

    if (this.database.PERSONALIDADES.length <= 0) {
      this.database.get_datos ('personalidades').subscribe ((res: any) => {
        this.database.PERSONALIDADES = res;
      }, error => {
        console.log (error);
      });
    }

    if (this.database.APARIENCIAS.length <= 0) {
      this.database.get_datos ('apariencias').subscribe ((res: any) => {
        // console.log (res);
        this.database.APARIENCIAS = res;
      }, error => {
        console.log (error);
      });
    }

    if (this.database.EXTRAS.length <= 0) {
      this.database.get_datos ('extras').subscribe ((res: any) => {
        console.log (res);
        this.database.EXTRAS = res;
      }, error => {
        console.log (error);
      });
    }
  }

  close () {
    this.modalController.dismiss (null, 'close');
  }

  filter () {
    this.modalController.dismiss ({
      // order_by: this.order_by,
      relationship: this.relationship,
      idiomas: this.idiomas,
      personalidad_map: this.personalidad_map,
      apariencia_map: this.apariencia_map,
      extra_map: this.extra_map,
      edad_range: this.edad_range
    }, 'filter');
  }

  select_changed (event: any, key: string, map: Map <string, number []>) {
    map.set (key, event.detail.value);
  }

  get_map_value (key: string, map: Map <string, number []>) {
    if (map.has (key)) {
      return map.get (key);
    }

    return [];
  }
}
