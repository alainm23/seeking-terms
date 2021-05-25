import { Component, OnInit } from '@angular/core';

import { LoadingController, NavController, ToastController, Platform } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';

// Geo
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Geolocation, Geoposition } from '@ionic-native/geolocation/ngx';
declare var google: any;
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';

@Component({
  selector: 'app-request-gps',
  templateUrl: './request-gps.page.html',
  styleUrls: ['./request-gps.page.scss'],
})
export class RequestGpsPage implements OnInit {
  location: any;
  error_message: any;
  id: any;
  constructor (
    private navController: NavController,
    private toastController: ToastController,
    private loadingController: LoadingController,
    private platform: Platform,
    private locationAccuracy: LocationAccuracy,
    private androidPermissions: AndroidPermissions,
    private geolocation: Geolocation,
    private route: ActivatedRoute,
    private backgroundGeolocation: BackgroundGeolocation) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get ('id');
  }

  check_gps () {
    if (this.platform.is ('cordova')) {
      this.checkGPSPermission ();
    } else {
      this.getLocationCoordinates ();
    }
  }

  async checkGPSPermission () {
    this.androidPermissions.checkPermission (this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then ((result: any) => {
        if (result.hasPermission) {
          this.askToTurnOnGPS ();
        } else {
          this.requestGPSPermission ();
        }
      }, err => {
        this.error_message = JSON.stringify (err);
        console.log ('checkGPSPermission', err);
        alert ('checkGPSPermission' + JSON.stringify (err));
      }
    );
  }

  async askToTurnOnGPS () {
    this.locationAccuracy.request(this.locationAccuracy.REQUEST_PRIORITY_HIGH_ACCURACY).then(() => {
      this.getLocationCoordinates ();
    }, error => {
      this.error_message = JSON.stringify (error);
      alert ('askToTurnOnGPS' + JSON.stringify (error));
      console.log ('Error requesting location permissions ' + JSON.stringify(error));
    });
  }

  async requestGPSPermission () {
    this.locationAccuracy.canRequest().then((canRequest: boolean) => {
      if (canRequest) {
        
      } else {
        this.androidPermissions.requestPermission (this.androidPermissions.PERMISSION.ACCESS_COARSE_LOCATION).then(() => {
          this.askToTurnOnGPS ();
        }, error => {
          this.error_message = JSON.stringify (error);
          alert ('requestGPSPermission' + JSON.stringify (error));
          console.log ('requestPermission Error requesting location permissions ' + error);
        });
      }
    });
  }

  async getLocationCoordinates () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    if (this.platform.is ('cordova')) {
      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: false, //  enable this hear sounds for background-geolocation life-cycle.
        stopOnTerminate: false, // enable this to clear background location settings when the app terminates
      };
  
      this.backgroundGeolocation.configure (config).then (() => {
        this.backgroundGeolocation.on (BackgroundGeolocationEvents.location).subscribe((resp: BackgroundGeolocationResponse) => {
          /// alert (JSON.stringify (resp));
          let directionsService: any = new google.maps.DirectionsService ();
          let geocoder: any = new google.maps.Geocoder ();
  
          let location = new google.maps.LatLng (
            resp.latitude,
            resp.longitude
            // -13.5242449,
            // -71.9625967
          );
  
          let request = {
            origin: location,
            destination: location,
            travelMode: google.maps.TravelMode.WALKING
          };
  
          directionsService.route (request, (result: any, status: any) => {
            if (status == 'OK') {
              geocoder.geocode ({'placeId': result.geocoded_waypoints [0].place_id}, (results: any, status: any) => {
                loading.dismiss ();
                this.backgroundGeolocation.stop ();
                this.backgroundGeolocation.finish ();
                
                if (status == 'OK') {
                  this.get_location (results [0], resp.latitude, resp.longitude);
                } else {
                  
                }
              });
            } else {
              loading.dismiss ();
            }
          });
        });
      });
  
      this.backgroundGeolocation.start ();
    } else {
      this.geolocation.getCurrentPosition ().then ().catch ();
      this.geolocation.getCurrentPosition ({enableHighAccuracy: true, timeout: 60 * 1000, maximumAge: 0}).then ((resp: Geoposition) => {
        let directionsService: any = new google.maps.DirectionsService ();
        let geocoder: any = new google.maps.Geocoder ();

        let location = new google.maps.LatLng (
          resp.coords.latitude,
          resp.coords.longitude
          // -13.5242449,
          // -71.9625967
        );

        let request = {
          origin: location,
          destination: location,
          travelMode: google.maps.TravelMode.WALKING
        };

        directionsService.route (request, (result: any, status: any) => {
          if (status == 'OK') {
            geocoder.geocode ({'placeId': result.geocoded_waypoints [0].place_id}, (results: any, status: any) => {
              loading.dismiss ();

              if (status == 'OK') {
                this.get_location (results [0], resp.coords.latitude, resp.coords.longitude);
              } else {
                
              }
            });
          } else {
            loading.dismiss ();
          }
        });
      }).catch ((error: any) => {
        this.error_message = JSON.stringify (error);
        loading.dismiss ();
        console.log (error);
      });
    }
  }

  get_location (result: any, latitude: number, longitude: number) {
    let pais: string = '';
    let pais_code: string = '';
    let ciudad: string = '';
    let referencias: string [] = [];

    result.address_components.forEach ((element: any) => {
      if (element.types.indexOf ("country") > -1) {
        pais = element.long_name;
        pais_code = element.short_name;
      }

      if (element.types.indexOf ("locality") > -1) {
        ciudad = element.long_name;
      }

      if (element.types.indexOf ("administrative_area_level_1") > -1) {
        referencias.push (element.long_name);
      }

      if (element.types.indexOf ("administrative_area_level_2") > -1) {
        referencias.push (element.long_name);
      }
    });

    if (ciudad === '') {
      result.address_components.forEach ((element: any) => {
        if (element.types.indexOf ("administrative_area_level_1") > -1) {
          ciudad = element.long_name;
        }
      });
    }

    this.location = {
      ciudad: ciudad,
      pais: pais,
      pais_code: pais_code,
      referencias: referencias,
      latitud: latitude,
      longitud: longitude
    };

    console.log (this.location);
    this.navController.navigateForward (['registro', this.id, JSON.stringify (this.location)]);
  }

  back_step () {
    this.navController.back ();
  }
}
