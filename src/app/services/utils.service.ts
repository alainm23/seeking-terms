import { Injectable } from '@angular/core';

import { TranslateService } from '@ngx-translate/core';
import { Storage } from '@ionic/storage-angular';
/*import { first } from 'rxjs/operators';*/

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor (private translate: TranslateService, private storage: Storage) {

  }

  get_translate (key: string) {
    return this.translate.instant (key);
  }
}
