import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { LoadingController, ModalController } from '@ionic/angular';
import { loadScript } from "@paypal/paypal-js";

@Component({
  selector: 'app-payment',
  templateUrl: './payment.page.html',
  styleUrls: ['./payment.page.scss'],
})
export class PaymentPage implements OnInit {
  @ViewChild ('paypal', {static: true})  paypalElement: ElementRef;
  @Input () data: any;
  @Input () type: any;
  client_id: string = 'AaMqrxSoRQMkGCUZxyI1-XbxaCob6agKPn1COjZNX4R3Hd2R_iXtlk_HJyQ0rf1SoZbTX0i6dxK5cabb';
  constructor (private modalController: ModalController, private loadingController: LoadingController) { }

  async ngOnInit () {
    const loading = await this.loadingController.create ({
      translucent: true,
      spinner: 'lines-small',
      mode: 'ios'
    });

    await loading.present ();

    console.log (this.data);
    console.log (this.type);

    setTimeout (() => {
      if (this.type === 'subscription') {
        loadScript({
          "client-id": this.client_id,
          "vault": true,
          "intent": "subscription"
        }).then((paypal) => {
          paypal.Buttons ({
            createSubscription: (data: any, actions: any) => {
              return actions.subscription.create ({
                plan_id: this.data.id_plan_paypal
              });     
            },
            onApprove: (data: any, actions: any) => {
              this.modalController.dismiss ({
                data: this.data,
                type: this.type,
                response: data
              }, 'PAID');
              return;
              return actions.order.capture ().then((details) => {
              });
            },
            onError: (err: any) => {
              console.log (err);
            }
          }).render(this.paypalElement.nativeElement).then (() => {
            loading.dismiss ();
          });
        }).catch((err) => {
            console.error("failed to load the PayPal JS SDK script", err);
        });
      } else {
        loadScript({
          "client-id": this.client_id
        }).then((paypal) => {
          paypal.Buttons ({
            createOrder: (data: any, actions: any) => {
              return actions.order.create ({
                purchase_units: [{
                  amount: {
                    value: this.data.value
                  }
                }]
              });
            },
            onApprove: (data: any, actions: any) => {
              console.log ('onApprove');
              return actions.order.capture ().then ((details: any) => {
                console.log (details)
                if (details.status === 'COMPLETED') {
                  this.modalController.dismiss ({
                    data: this.data,
                    type: this.type,
                    response: details
                  }, 'PAID');
                }
              });
            },
            onError: (err: any) => {
              console.log (err);
            }
          }).render(this.paypalElement.nativeElement).then (() => {
            loading.dismiss ();
          });
        }).catch((err) => {
            console.error("failed to load the PayPal JS SDK script", err);
        });
      }
    }, 1000);
  }

}
