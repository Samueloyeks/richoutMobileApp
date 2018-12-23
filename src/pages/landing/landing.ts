import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthorizeDonorPage } from '../authorize-donor/authorize-donor';
import { AuthorizeReceiverPage } from '../authorize-receiver/authorize-receiver';

/**
 * Generated class for the LandingPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
 
@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
    this.menuCtrl.enable(false, 'myMenu');
  } 

  gotoAuthDonor(){ 
    this.navCtrl.push(AuthorizeDonorPage)
  }
  gotoAuthHandicap(){
    this.navCtrl.push(AuthorizeReceiverPage)
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LandingPage');
  }

}
