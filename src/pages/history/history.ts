import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, App, LoadingController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Base64 } from '@ionic-native/base64';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { CategoriesPage } from '../categories/categories';

/**
 * Generated class for the HistoryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-history',
  templateUrl: 'history.html',
})
export class HistoryPage {
  uid: any;
  fullName: any;
  phoneNumber: any;
  email: any;
  accountType:any;
  memberSince: any;
  data: any;
  constructor(public db:DbProvider,private base64: Base64, public apiService: ApIserviceProvider, 
    public navParams: NavParams,public navCtrl: NavController,public actionSheetCtrl:ActionSheetController,
    public loadingCtrl:LoadingController, public app: App){
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoryPage');
  }

  ionViewWillLoad(){
    const userData= this.db.get("userInfo");
    this.fullName = userData["fullName"];
    this.phoneNumber = userData["phoneNumber"];
    this.email = userData["email"];
    this.accountType = userData["accountType"];
  }
  goBack(){
    this.navCtrl.pop();
  }
  goToCategories(){
    this.navCtrl.push(CategoriesPage);
  }

}
