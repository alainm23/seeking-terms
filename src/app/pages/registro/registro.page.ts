import { Component, OnInit, ViewChild } from '@angular/core';

// Services
import { IonSlides, Platform, ToastController, LoadingController, IonInput, ModalController, ActionSheetController, NavController } from '@ionic/angular'; 
import { AuthService } from '../../services/auth.service';
import { DatabaseService } from '../../services/database.service';
import * as moment from 'moment';
import { Camera, CameraOptions, PictureSourceType } from '@ionic-native/camera/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { Storage } from '@ionic/storage-angular';
import { ActivatedRoute } from '@angular/router';

// Forms
import { FormGroup , FormControl, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { File, FileEntry } from '@ionic-native/file/ngx';

// Modals
import { CountrySelectPage } from '../../modals/country-select/country-select.page';
import { SelectPlanPage } from '../../modals/select-plan/select-plan.page';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  @ViewChild (IonSlides, { static: false }) slides: IonSlides;
  @ViewChild ("year_input", { static: false }) year_input: IonInput;
  @ViewChild ("month_input", { static: false }) month_input: IonInput;
  @ViewChild ("day_input", { static: false }) day_input: IonInput;

  index: number = 0;
  length: number = 10;
  id: string;

  form_usernick: FormGroup;
  form_birthday: FormGroup;
  form_sexo: FormGroup;
  form_email: FormGroup;
  form_password: FormGroup;
  form_location: FormGroup;
  form_terms: FormGroup;

  slideOpts = {
    initialSlide: 0,
    duration: 400,
    slidesPerView: 1
  };

  inputs: Map <string, IonInput> = new Map <string, IonInput> ();
  generos_map: Map <string, boolean> = new Map <string, boolean> ();
  relaciones_map: Map <string, boolean> = new Map <string, boolean> ();
  generos: any [] = [];
  relaciones: any [] = [];
  regions: any [] = [];
  cities: any [] = [];

  profile_image: any = '';
  profile_file: any = {};
  photos: string [] = ['', '', '', '', ''];
  photos_file: any = [null, null, null, null, null];
  lang: string;
  constructor (private toastController: ToastController,
    private auth: AuthService,
    private loadingController: LoadingController,
    private database: DatabaseService,
    private modalController: ModalController,
    private camera: Camera,
    private crop: Crop,
    private actionSheetController: ActionSheetController,
    private platform: Platform,
    private file: File,
    private route: ActivatedRoute,
    private navController: NavController,
    private storage: Storage) { }

  ngOnInit () {
    this.id = this.route.snapshot.paramMap.get ('id');

    if (this.id !== 'null') {
      this.length = 8;
    }

    console.log (this.id);

    this.form_usernick = new FormGroup ({
      usernick: new FormControl ('', [Validators.required])
    });

    this.form_birthday = new FormGroup ({
      day: new FormControl ('', [Validators.required]),
      month: new FormControl ('', [Validators.required]),
      year: new FormControl ('', [Validators.required])
    });

    this.form_sexo = new FormGroup ({
      sexo: new FormControl ('', [Validators.required])
    });

    const email = new FormControl ('', Validators.required);
    const confirm_email = new FormControl ('', [Validators.required, CustomValidators.equalTo (email)]);

    this.form_email = new FormGroup ({
      email: email,
      confirm_email: confirm_email
    });

    this.form_password = new FormGroup ({
      password: new FormControl ('', [Validators.required])
    });

    this.form_location = new FormGroup ({
      pais: new FormControl ('', [Validators.required]),
      pais_nombre: new FormControl ('', [Validators.required]),
      id_region: new FormControl ('', [Validators.required]),
      ciudad: new FormControl ('', [Validators.required])
    });

    this.form_terms = new FormGroup ({
      terms: new FormControl (false, [Validators.required, Validators.pattern('true')])
    });

    this.storage.get ('lang').then ((lang: any) => {
      this.lang = lang;
      this.get_datos (lang);
    });
  }

  get_datos (lang: string) {
    this.database.get_datos ('generos', lang).subscribe ((res: any) => {
      this.generos = res;
    }, error => {
      console.log (error);
    });

    this.database.get_datos ('relaciones', lang).subscribe ((res: any) => {
      console.log (res);
      this.relaciones = res;
    }, error => {
      console.log (error);
    });

    this.database.get_paises ().subscribe ((res: any) => {
      console.log (res);
    }, error => {
      console.log (error);
    })
  }

  ionViewDidEnter () {
    setTimeout (() => {
      this.slides.lockSwipeToNext (true);
      this.inputs.set ('year_input', this.year_input);
      this.inputs.set ('month_input', this.month_input);
      this.inputs.set ('day_input', this.day_input);
    }, 250);
  }

  slides_changed () {
    this.slides.getActiveIndex ().then ((index: number) => {
      this.index = index;
      console.log (this.index);
    });
  }

  valid_step () {
    let returned: boolean = false;

    if (this.id === 'null') {
      if (this.index === 0) {
        if (this.form_usernick.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 1) {
        const fecha = moment (this.form_birthday.value.year + '-' + this.form_birthday.value.month + '-' + this.form_birthday.value.day);
        if (fecha.isValid ()) {
          if (parseInt (moment ().format ('YYYY')) - parseInt (fecha.format ('YYYY')) < 18) {
            returned = false;
            this.presentToast ('The selected date is invalid.', 'danger');
          } else {
            returned = true;
          }
        } else {
          this.presentToast ('The selected date is invalid.', 'danger');
        }
      } else if (this.index === 2) {
        if (this.form_sexo.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 3) {
        if (this.generos_map.size <= 0) {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 4) {
        if (this.relaciones_map.size <= 0) {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 5) {
        if (this.form_email.hasError ('required')) {
          this.presentToast ('The given data was invalid.', 'danger');
        } else if (this.form_email.hasError ('equalTo')) {
          this.presentToast ('The confirm email and email must match.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 6) {
        if (this.form_password.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 7) {
        if (this.form_location.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 8) {
        if (this.profile_image === '') {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 9) {
        returned = true;
      } else if (this.index === 10) {
        if (this.form_terms.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      }
    } else {
      if (this.index === 0) {
        if (this.form_usernick.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 1) {
        const fecha = moment (this.form_birthday.value.year + '-' + this.form_birthday.value.month + '-' + this.form_birthday.value.day);
        if (fecha.isValid ()) {
          if (parseInt (moment ().format ('YYYY')) - parseInt (fecha.format ('YYYY')) < 18) {
            returned = false;
            this.presentToast ('The selected date is invalid.', 'danger');
          } else {
            returned = true;
          }
        } else {
          this.presentToast ('The selected date is invalid.', 'danger');
        }
      } else if (this.index === 2) {
        if (this.form_sexo.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 3) {
        if (this.generos_map.size <= 0) {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 4) {
        if (this.relaciones_map.size <= 0) {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 5) {
        if (this.form_location.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      } else if (this.index === 6) {
        if (this.profile_image === '') {
          this.presentToast ('The given data was invalid.', 'danger');
        } else {
          returned = true;
        }
      } else if (this.index === 7) {
        returned = true;
      } else if (this.index === 8) {
        if (this.form_terms.invalid) {
          this.presentToast ('The given data was invalid.', 'danger');  
        } else {
          returned = true;
        }
      }
    }

    return returned;
  }

  async next_step () {
    if (this.valid_step ()) {
      const loading = await this.loadingController.create ({
        translucent: true,
        spinner: 'lines-small',
        mode: 'ios'
      });
  
      await loading.present ();

      if (this.id === 'null') {
        if (this.index === 0 || this.index === 1 || this.index === 2 ||
            this.index === 3 || this.index === 4 || this.index === 7 ||
            this.index === 8 || this.index === 9) {
          loading.dismiss ();
          this.slideNext ();
        } else if (this.index === 5) {
          let request: any = this.form_email.value;
          request.campo = 'email';
  
          this.auth.validar_campo (request).subscribe ((res: any) => {
            loading.dismiss ();
            console.log (res);
  
            if (res.status) {
              this.slideNext ();
            } else {
              this.show_api_error (res, ['email', 'confirm_email']);
            }
          }, error => {
            loading.dismiss ();
            console.log (error);
          });
        } else if (this.index === 6) {
          let request: any = this.form_password.value;
          request.campo = 'password';
  
          this.auth.validar_campo (request).subscribe ((res: any) => {
            loading.dismiss ();
            console.log (res);
  
            if (res.status) {
              this.slideNext ();
            } else {
              this.show_api_error (res, ['password']);
            }
          }, error => {
            loading.dismiss ();
            console.log (error);
          });
        } else if (this.index === 10) {
          let generos_interes: number [] = [];
          let relaciones: number [] = [];
  
          this.generos_map.forEach ((value: boolean, key: string) => {
            generos_interes.push (parseInt (key));
          });
  
          this.relaciones_map.forEach ((value: boolean, key: string) => {
            relaciones.push (parseInt (key));
          });
          
          let request: any = {};
          request.id = 0;
          request.usernick = this.form_usernick.value.usernick;
          request.lenguaje = this.lang;
          request.sexo = this.form_sexo.value.sexo;
          request.relaciones = relaciones;
          request.generos_interes = generos_interes;
          request.email = this.form_email.value.email;
          request.password = this.form_password.value.password;
          request.pais = this.form_location.value.pais.code + '-' + this.form_location.value.pais.name;
          request.id_region = this.form_location.value.id_region.fipsCode;
          request.nombre_region = this.form_location.value.id_region.name;
          request.id_ciudad = this.form_location.value.ciudad.id;
          request.nombre_ciudad = this.form_location.value.ciudad.name;
          request.latitud = this.form_location.value.ciudad.latitude;
          request.longitud = this.form_location.value.ciudad.longitude;
          request.year = this.form_birthday.value.year;
          request.month = this.form_birthday.value.month;
          request.day = this.form_birthday.value.day;
          request.imagen = this.profile_file;
          request.galeria = this.photos_file;

          console.log (request);
  
          this.auth.registro (request).subscribe ((res: any) => {
            console.log (res);
            loading.dismiss ();
  
            if (res ['status'] === undefined) {
              this.select_plan (res, request.sexo);
            } else {
              this.show_api_error (res, ['usernick', 'sexo', 'relaciones', 'generos_interes', 'email',
              'password', 'pais', 'id_region', 'id_ciudad', 'latitud', 'longitud', 'year', 'month', 
              'day', 'imagen', 'galeria']);
            }
          }, error => {
            console.log (error);
            loading.dismiss ();
          });
        }
      } else {
        if (this.index === 0 || this.index === 1 ||this.index === 2 ||
            this.index === 3 || this.index === 4 || this.index === 5 ||
            this.index === 6 || this.index === 7) {
          loading.dismiss ();
          this.slideNext ();
        } else if (this.index === 8) {
          let generos_interes: number [] = [];
          let relaciones: number [] = [];
  
          this.generos_map.forEach ((value: boolean, key: string) => {
            generos_interes.push (parseInt (key));
          });
  
          this.relaciones_map.forEach ((value: boolean, key: string) => {
            relaciones.push (parseInt (key));
          });
          
          let request: any = {};
          request.id = 0;
          request.usernick = this.form_usernick.value.usernick;
          request.lenguaje = this.lang;
          request.sexo = this.form_sexo.value.sexo;
          request.relaciones = relaciones;
          request.generos_interes = generos_interes;
          request.email = this.form_email.value.email;
          request.password = this.form_password.value.password;
          request.pais = this.form_location.value.pais.code + '-' + this.form_location.value.pais.name;
          request.id_region = this.form_location.value.id_region.fipsCode;
          request.nombre_region = this.form_location.value.id_region.name;
          request.id_ciudad = this.form_location.value.ciudad.id;
          request.nombre_ciudad = this.form_location.value.ciudad.name;
          request.latitud = this.form_location.value.ciudad.latitude;
          request.longitud = this.form_location.value.ciudad.longitude;
          request.year = this.form_birthday.value.year;
          request.month = this.form_birthday.value.month;
          request.day = this.form_birthday.value.day;
          request.imagen = this.profile_file;
          request.galeria = this.photos_file;
  
          if (this.id !== 'null') {
            request.social = true;
            request.id = parseInt (this.id);
            delete request.email;
            delete request.password;
          }
  
          console.log (request);

          this.auth.registro (request).subscribe ((res: any) => {
            console.log (res);
            loading.dismiss ();
  
            if (res ['status'] === undefined) {
              this.select_plan (res, request.sexo);
            } else {
              this.show_api_error (res, ['usernick', 'sexo', 'relaciones', 'generos_interes', 'email',
              'password', 'pais', 'id_region', 'id_ciudad', 'latitud', 'longitud', 'year', 'month', 
              'day', 'imagen', 'galeria']);
            }
          }, error => {
            console.log (error);
            loading.dismiss ();
          });
        }
      }
    }
  }

  async select_plan (res: any, sexo: any) {
    const modal = await this.modalController.create({
      component: SelectPlanPage,
      componentProps: {
        page: 'registro'
      }
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'free') {
        this.auth.save_local_user (res).then (() => {
          this.navController.navigateRoot ('home');
        });
      }
    });
    
    return await modal.present ();
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

  slideNext () {
    this.slides.lockSwipeToNext (false);
    this.slides.slideNext ();

    setTimeout (() => {
      this.slides.lockSwipeToNext (true);
    }, 400);
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

  set_input_focus (input: string) {
    this.inputs.get (input).setFocus ();
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

  async select_country () {
    const modal = await this.modalController.create({
      component: CountrySelectPage,
    });

    modal.onWillDismiss ().then ((response: any) => {
      if (response.role === 'data') {
        this.regions = [];
        this.cities = [];

        this.form_location.controls ['id_region'].setValue (null);
        this.form_location.controls ['ciudad'].setValue (null);
        this.form_location.controls ['pais'].setValue (response.data);
        this.form_location.controls ['pais_nombre'].setValue (response.data.name);

        this.get_regions (response.data.code);
      }
    });
    
    return await modal.present ();
  }

  async get_regions (pais_id: string) {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    this.database.get_regions (pais_id).subscribe ((res: any) => {
      this.regions = res.data;
      console.log (res);
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  async region_changed (event: any) {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    console.log (event);

    this.cities = [];
    this.form_location.controls ['ciudad'].setValue (null);

    this.database.get_cities (this.form_location.value.pais.code, event.detail.value.fipsCode).subscribe ((res: any) => {
      this.cities = res.data;
      console.log (res);
      loading.dismiss ();
    }, error => {
      loading.dismiss ();
      console.log (error);
    });
  }

  async selectImageSource (type: string, index: number=0, fileInput: any=null) {
    if (this.platform.is ('cordova')) {
      const actionSheet = await this.actionSheetController.create ({
        buttons: [{
          text: 'Take a picture',
          icon: 'camera',
          handler: () => {
            this.takePicture (this.camera.PictureSourceType.CAMERA, type, index);
          }
        }, {
          text: 'Select a photo',
          icon: 'images',
          handler: () => {
            this.takePicture (this.camera.PictureSourceType.PHOTOLIBRARY, type, index);
          }
        }]
      });
  
      await actionSheet.present ();
    } else {
      fileInput.click ();
    }
  }

  get_profile_image () {
    return this.profile_image;
  }

  get_photos_index (index: number) {
    return this.photos [index];
  }

  async takePicture (sourceType: PictureSourceType, type: string, index: number=0) {
    const options: CameraOptions = {
      quality: 100,
      sourceType: sourceType,
      correctOrientation: true,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE
    };

    this.camera.getPicture (options).then ((imageData: any) => {
      this.cropImage (imageData, type, index);
    }, (err) => {
      this.presentToast (JSON.stringify (err), 'danger');
    });
  }

  cropImage (fileUrl: string, type: string, index: number=0) {
    const options: CropOptions = {
      quality: 50,
      targetWidth: 400,
      targetHeight: 400
    };

    this.crop.crop (fileUrl, options).then (newPath => {
      this.file.resolveLocalFilesystemUrl (newPath).then ((entry: FileEntry) => {
        entry.file ((file: any) => {
          this.readFile (file, newPath, type, index);
        })
      }, (err) => {
        this.presentToast (JSON.stringify (err), 'danger');
      });
    },error => {
      alert('Error cropping image' + error);
    });
  }

  readFile (file: any, newPath: string, type: string, index: number=0) {
    const reader = new FileReader ();
    
    reader.onload = async () => {
      const blob = new Blob ([reader.result], {
        type: file.type
      });

      const formData: FormData = new FormData ();
      formData.append ('campo', 'imagen');
      formData.append ('imagen', blob, file.name);

      const loading = await this.loadingController.create ({
        translucent: true,
        spinner: 'lines-small',
        mode: 'ios'
      });
  
      await loading.present ();

      this.database.valid_photo (formData).subscribe ((res: any) => {        
        loading.dismiss ();

        if (res.status) {
          this.showCroppedImage (newPath.split('?')[0], type, index);
          if (type === 'profile') {
            this.profile_file = {
              file: blob,
              name: file.name
            };
          } else {
            this.photos_file [index] = {
              file: blob,
              name: file.name
            };
          }
        } else {
          this.presentToast (res.message, 'danger');
        }
      }, error => {
        alert (JSON.stringify (error));
        this.show_api_error (error, ['imagen']);
        loading.dismiss ();
      });
    };

    reader.readAsArrayBuffer (file);
  }

  showCroppedImage (ImagePath: string, type: string, index: number=0) {
    var copyPath = ImagePath;
    var splitPath = copyPath.split('/');
    var imageName = splitPath[splitPath.length - 1];
    var filePath = ImagePath.split(imageName)[0];

    this.file.readAsDataURL(filePath, imageName).then ((base64: any) => {
      if (type === 'profile') {
        this.profile_image = base64;
      } else {
        this.photos [index] = base64;
      }
    }, error => {
      alert('Error in showing image' + error);
    });
  }

  changeListener (event: any) {
    if (event.target.files.length > 0) {
      let file = event.target.files [0];

      console.log (file);

      this.profile_file = {
        file: file,
        name: file.name
      };

      this.getBase64 (file)
    }
  }

  getBase64(file: any) {
    var reader = new FileReader ();
    reader.readAsDataURL (file);
    
    reader.onload = () => {
      this.profile_image = reader.result;
    };
    
    reader.onerror = (error) => {
      console.log (error);
    };
  }
}
