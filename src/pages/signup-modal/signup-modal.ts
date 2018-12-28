import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController } from 'ionic-angular';
import { HomePage } from '../home/home';

/**
 * Generated class for the SignupModalPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup-modal',
  templateUrl: 'signup-modal.html',
})
export class SignupModalPage {

  constructor(public alertCtrl:AlertController,public navCtrl: NavController, public navParams: NavParams,public view:ViewController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupModalPage');
  }

  dismissModal(){
    this.view.dismiss();
    this.navCtrl.setRoot(HomePage);
    const Alert = this.alertCtrl.create({
          message: 'A confirmation email has been sent to your email address',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        Alert.present();
  }

}
