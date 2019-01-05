import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AuthorizeDonorPage } from '../authorize-donor/authorize-donor';
import { AuthorizeReceiverPage } from '../authorize-receiver/authorize-receiver';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-landing',
  templateUrl: 'landing.html',
})
export class LandingPage {

  constructor(public db:DbProvider,public navCtrl: NavController, public navParams: NavParams,public menuCtrl:MenuController) {
    this.menuCtrl.enable(false, 'myMenu');

  } 

  gotoAuthDonor(){ 
    this.navCtrl.push(AuthorizeDonorPage)
  }
  gotoAuthHandicap(){
    this.navCtrl.push(AuthorizeReceiverPage)
  }

  ionViewDidLoad() {
    // console.log(this.db.create("userInfo.gender","male")); 
    // console.log(this.db.get("userInfo.gender")); 
    // console.log(this.db.set("userInfo.fullName","Sam")); 
    // console.log(this.db.get("userInfo.fullName")); 
    // console.log(this.db.get("userInfo")); 

    // console.log(this.db.set("randomObj",{name:"sam"})); 
    // console.log(this.db.get("randomObj")); 


  }

}
