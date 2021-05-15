import { Injectable } from '@angular/core';
import { Platform } from '@ionic/angular';
import { AdMobFree, AdMobFreeBannerConfig, AdMobFreeInterstitialConfig, AdMobFreeRewardVideoConfig } from '@ionic-native/admob-free/ngx';

@Injectable({
  providedIn: 'root'
})
export class AdmobService {
  // //CONFIGURACION DEL BANNER
  // bannerConfig: AdMobFreeBannerConfig = {
  //   isTesting: true, // DURANTE DEL DESARROLLO
  //   autoShow: true//,
  //   //id: "ID GENERADO EN ADMOB ca-app-pub"
  // };
  
  
  // //CONFIGURACION DEL INTERSTITIAL
  // interstitialConfig: AdMobFreeInterstitialConfig = {
  //   isTesting: true, // DURANTE DEL DESARROLLO
  //   autoShow: false,
  //   //id: "ID GENERADO EN ADMOB ca-app-pub"
  // };
  // //CONFIGURACION DEL REWARD VIDEO.
  RewardVideoConfig: AdMobFreeRewardVideoConfig = {
    autoShow: false,
    id: "ca-app-pub-3940256099942544/5224354917"
  };
  
  constructor (public platform: Platform, private admobFree: AdMobFree) {
    this.platform.ready().then (async () => {
      this.admobFree.rewardVideo.config (this.RewardVideoConfig);
      this.admobFree.rewardVideo.prepare ().then (() => {
        console.log('REWARD VIDEO CARGADO CORRECTAMENTE');

        //REWARD VIDEO
        document.addEventListener ('admob.rewardvideo.events.REWARD', (event) => {
          console.log ('admob.rewardvideo.events.REWARD', event);
        });

        document.addEventListener ('admob.rewardvideo.events.CLOSE', (event) => {
          console.log ('admob.rewardvideo.events.CLOSE', event);
        });

        document.addEventListener ('admob.rewardvideo.events.START', (event) => {
          console.log ('admob.rewardvideo.events.START', event);
        });
      }).catch (e =>
        console.log('PROBLEMA CARGANDO REWARDVIDEO: ', e)
      );
    });
  }

  MostrarBanner () {
    // //COMPROBAR Y MOSTRAR EL BANNER
    // this.admobFree.banner.prepare().then(() => {
    //   console.log('BANNER CARGADO CORRECTAMENTE')
    // }).catch(e =>
    //   console.log('PROBLEMA CARGANDO BANNER: ', e)
    // );
  }

  MostrarInterstitial () {
    // //COMPROBAR QUE EL INTERSTITIAL ESTA LISTO
    // this.admobFree.interstitial.isReady().then(() => {
    // //SI ESTA LISTO MOSTRAR ANUNCIO
    // this.admobFree.interstitial.show ().then (() => {
    //   console.log('INTERSTITIAL CARGADO CORRECTAMENTE')
    // })
    // .catch(e => console.log('PROBLEMA MOSTRANDO REWARD VIDEO: ', e)  );
    // })
    // .catch(e => console.log('PROBLEMA CARGANDO REWARD VIDEO: ', e)  );
  }

  async MostrarRewardVideo () {
    //COMPROBAR QUE EL REWARDVIDEO ESTA LISTO
    this.admobFree.rewardVideo.isReady().then (() => {
      //SI ESTA LISTO MOSTRAR ANUNCIO
      this.admobFree.rewardVideo.show ().then (() => {
        console.log('BANNER CARGADO CORRECTAMENTE')
      })
      .catch (e => console.log('PROBLEMA MOSTRANDO REWARD VIDEO: ', e));
      })
    .catch (e => console.log('PROBLEMA CARGANDO REWARD VIDEO: ', e));
  }
}
