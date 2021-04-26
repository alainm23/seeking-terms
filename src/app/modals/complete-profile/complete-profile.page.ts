import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { DatabaseService } from '../../services/database.service';
import { IonSlides, Platform, ToastController, LoadingController, IonInput, ModalController, ActionSheetController, NavController } from '@ionic/angular'; 
import { report } from 'process';
import { FormGroup , FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-complete-profile',
  templateUrl: './complete-profile.page.html',
  styleUrls: ['./complete-profile.page.scss'],
})
export class CompleteProfilePage implements OnInit {
  @ViewChild (IonSlides, { static: false }) ion_slides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    duration: 400
  };

  index: number = 0;
  slides: any [] = [];
  idiomas: any [] = [];
  extras: any [] = [];
  intereses: any [] = [];
  apariencia_items: any [] = [];
  personalidad_items: any [] = [];
  apariencias: any [] = [];
  personalidades: any [] = [];

  intereses_map: Map <string, boolean> = new Map <string, boolean> ();
  idiomas_map: Map <string, boolean> = new Map <string, boolean> ();
  apariencia_map: Map <string, number> = new Map <string, number> ();
  personalidad_map: Map <string, number> = new Map <string, number> ();

  estoy_buscando: string = '';
  regalo_recibir: string = '';
  personal_data_form: FormGroup;
  extras_form: FormGroup;

  loading: boolean = true;
  apariencias_found: boolean = false;
  personalidades_found: boolean = false;
  constructor (private database: DatabaseService,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private modalController: ModalController) { }

  ngOnInit () {
    this.personal_data_form = new FormGroup ({
      name: new FormControl ('', [Validators.required]),
      telefono: new FormControl ('', [Validators.required]),
      acerca_de_mi: new FormControl ('', [Validators.required]),
      altura: new FormControl ('', [Validators.required]),
      sistema: new FormControl ('metric', [Validators.required]),
    });

    this.extras_form = new FormGroup ({
      ingreso_anual: new FormControl ('', [Validators.required]),
      patrimonio: new FormControl ('', [Validators.required]),
      relocate: new FormControl ('', []),
      passport_ready: new FormControl ('', [])
    });

    this.database.get_data_faltante ().subscribe ((res: any) => {
      console.log (res);
      res.datos.forEach ((element: any) => {
        if (typeof element === 'string') {
          this.slides.push (element);
        } else if (Array.isArray (element)) {
          element.forEach ((e: any) => {
            this.slides.push (e.name);

            if (e.name_space === 'apariencia_') {
              this.apariencias.push (e);
            } else if (e.name_space === 'personalidad_') {
              this.personalidades.push (e);
            }
          });
        }
      });

      this.apariencias.forEach ((e: any) => {
        this.apariencia_items [e.name] = {
          id: e.id,
          items: e.items
        };
      });

      this.personalidades.forEach ((e: any) => {
        this.personalidad_items [e.name] = {
          id: e.id,
          items: e.items
        };
      });

      this.idiomas = res.idiomas;
      this.extras = res.extras;
      this.loading = false;
    }, error => {
      this.loading = false;
      console.log (error);
    });

    this.get_datos ();
  }

  get_datos () {
    this.database.get_datos ('intereses').subscribe ((res: any) => {
      this.intereses = res;
      console.log (res);
    }, error => {
      console.log (error);
    });
  }

  slides_changed () {
    this.ion_slides.getActiveIndex ().then ((index: number) => {
      this.index = index;
      console.log (this.index);
    });
  }

  get_slide_type (slide: any) {
    let returned: string = '';

    if (typeof slide === 'string') {
      returned = slide;
    }

    return returned;
  }

  checkbox_changed (event: any, id: string, map: Map <string, boolean>) {
    if (event.detail.checked) {
      map.set (id, true);
    } else {
      if (map.has (id)) {
        map.delete (id);
      }
    }
  }

  valid_step (slide: string) {
    let returned: boolean = false;

    if (slide === 'intereses') {
      if (this.intereses_map.size <= 0) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    } else if (slide === 'estoy_buscando') {
      if (this.estoy_buscando.trim ().split ('').length <= 0) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    } else if (slide === 'personal_data') {
      if (this.personal_data_form.invalid) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    } else if (this.get_valid_step_array (slide, this.apariencias)) {
      this.apariencias.forEach ((e: any) => {
        if (slide === e.name) {
          if (this.apariencia_map.has ('apariencia_' + e.id)) {
            returned = true;
          } else {
            this.presentToast ('The given data was invalid.', 'danger');
          }
        }
      });
    } else if (this.get_valid_step_array (slide, this.personalidades)) {
      this.personalidades.forEach ((e: any) => {
        if (slide === e.name) {
          if (this.personalidad_map.has ('personalidad_' + e.id)) {
            returned = true;
          } else {
            this.presentToast ('The given data was invalid.', 'danger');
          }
        }
      });
    } else if (slide === 'idiomas') {
      if (this.idiomas_map.size <= 0) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    } else if (slide === 'regalo_recibir') {
      if (this.regalo_recibir.trim ().split ('').length <= 0) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    } else if (slide === 'extras') {
      if (this.extras_form.invalid) {
        this.presentToast ('The given data was invalid.', 'danger');
      } else {
        returned = true;
      }
    }

    return returned;
  }

  get_valid_step_array (slide: string, array: any []) {
    let returned: boolean = false;

    array.forEach ((e: any) => {
      if (e.name === slide) {
        returned = true;
      }
    });

    return returned;
  }

  async next_step () {
    let slide = this.get_slide_type (this.slides [this.index]);
    if (this.valid_step (slide)) {
      const loading = await this.loadingController.create ({
        message: ''
      });
  
      await loading.present ();

      if (slide === 'intereses') {
        let intereses: number [] = [];
        this.intereses_map.forEach ((value: boolean, key: string) => {
          intereses.push (parseInt (key));
        });

        let request: any = {};
        request.step = slide;
        request.intereses = intereses;

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            this.show_api_error (res, ['intereses']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (slide === 'estoy_buscando') {
        let request: any = {};
        request.step = slide;
        request.estoy_buscando = this.estoy_buscando;

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            this.show_api_error (res, ['estoy_buscando']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (slide === 'personal_data') {
        let request: any = this.personal_data_form.value;
        request.step = slide;

        if (request.sistema === 'metric') {
          request.altura = request.altura;
        } else {
          request.altura_metros = request.altura;
        }

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            this.show_api_error (res, ['estoy_buscando']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (this.get_valid_step_array (slide, this.apariencias)) {
        let item = this.get_valor_by_name (slide, this.apariencias);

        console.log (item);

        let request: any = {};
        request.step = 'apariencias';
        this.apariencia_map.forEach ((value: number, key: string) => {
          console.log (key);
          if (key.split ('_') [1] == item.id) {
            request [key] = value;
          }
        });

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            // this.show_api_error (res, ['apariencias']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (this.get_valid_step_array (slide, this.personalidades)) {
        let item = this.get_valor_by_name (slide, this.personalidades);

        let request: any = {};
        request.step = 'personalidades';
        this.personalidad_map.forEach ((value: number, key: string) => {
          if (key.split ('_') [1] == item.id) {
            request [key] = value;
          }
        });

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            // this.show_api_error (res, ['intereses']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (slide === 'idiomas') {
        let idiomas: number [] = [];
        this.idiomas_map.forEach ((value: boolean, key: string) => {
          idiomas.push (parseInt (key));
        });

        let request: any = {};
        request.step = slide;
        request.idiomas = idiomas;

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            this.show_api_error (res, ['idiomas']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (slide === 'regalo_recibir') {
        let request: any = {};
        request.step = slide;
        request.regalo_recibir = this.regalo_recibir;

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.slideNext ();
          } else {
            this.show_api_error (res, ['regalo_recibir']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      } else if (slide === 'extras') {
        let request: any = this.extras_form.value;
        request.step = slide;

        this.extras.forEach ((e: any) => {
          if (e.id === 1) {
            request ['extra_' + e.id] = this.extras_form.value.relocate.id;
          } else {
            request ['extra_' + e.id] = this.extras_form.value.passport_ready.id;
          }
          
        });

        console.log (request);

        this.database.save_step_modal (request).subscribe ((res: any) => {
          console.log (res);
          loading.dismiss ();

          if (res.status) {
            this.modalController.dismiss (null, 'update');
          } else {
            this.show_api_error (res, ['estoy_buscando']);
          }
        }, error => {
          loading.dismiss ();
          console.log (error);
        });
      }
    }
  }

  get_valor_by_name (slide: string, array: any []) {
    let returned: any;

    array.forEach ((e: any) => {
      if (e.name === slide) {
        returned = e;
      }
    });

    return returned;
  }

  async presentToast (message: any, color: string) {
    const toast = await this.toastController.create ({
      message: message,
      color: color,
      duration: 2000,
      position: 'top'
    });

    toast.present ();
  }

  ionViewDidEnter () {
    setTimeout (() => {
      this.ion_slides.lockSwipeToNext (true);
    }, 250);
  }

  slideNext () {
    this.ion_slides.lockSwipeToNext (false);
    this.ion_slides.slideNext ();

    setTimeout (() => {
      this.ion_slides.lockSwipeToNext (true);
    }, 400);
  }

  show_api_error (res: any, values: string []) {
    values.forEach ((value: string) => {
      if (res.errors [value]) {
        res.errors [value].forEach ((error: string) => {
          this.presentToast (error, 'danger');
        });
      }
    });
  }

  radio_changed (event: any, value: string, map: Map <string, number>) {
    if (value === 'apariencia_') {
      map.set (value + event.detail.value.id_opcion_apariencia, event.detail.value.id);
    } else {
      map.set (value + event.detail.value.id_opcion_personalidad, event.detail.value.id);
    }

    console.log (map);
  }
}
