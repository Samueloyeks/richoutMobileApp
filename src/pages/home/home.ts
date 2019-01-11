import { Component,ViewChild } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, App } from 'ionic-angular';
import { AuthorizeDonorPage } from '../authorize-donor/authorize-donor';
import { Platform, Nav } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Base64 } from '@ionic-native/base64';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { Slides } from 'ionic-angular';
import { HistoryPage } from '../history/history';
import { LandingPage } from '../landing/landing';
import { CategoriesPage } from '../categories/categories';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  @ViewChild(Slides) slides: Slides;
  uid: any;
  fullName: any;
  phoneNumber: any;
  email: any;
  accountType:any;
  memberSince: any;
  data: any;
  constructor(public db:DbProvider,private base64: Base64, public apiService: ApIserviceProvider, 
    public navParams: NavParams,public navCtrl: NavController,public actionSheetCtrl:ActionSheetController,
    public loadingCtrl:LoadingController, public app: App) {

  }
  ionViewWillLoad(){
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.set('Authorization', 'Basic ' + this.base64.encodeFile(this.apiService.apiUsername + ":" + this.apiService.apiPassword));

    // const uid = this.uid;
    // const url = this.apiService.baseURL + 'users/fetchUserById';
    // var request = new Request(url, {
    //   method: 'POST',
    //   body: uid,
    //   headers: headers
    // });
    const userData= this.db.get("userInfo");
    this.fullName = userData["fullName"];
    this.phoneNumber = userData["phoneNumber"];
    this.email = userData["email"];
    this.accountType = userData["accountType"];



    // return fetch(request)
    //   .then(function (response) {
    //     // Handle response we get from the API
    //      response.json().then(function (data) {
    //       console.log(data)
    //       console.log(data.data);

    //       sessionStorage.profileData = JSON.stringify(data.data);
    //       return data.data;
    //     });

    //   }).catch(function (error) {
    //     console.log(error + 'My Error');
    //   });
 
  }

  presentActionSheet() { 
    const actionSheet = this.actionSheetCtrl.create({
      title: 'Are you sure you want to Log out?',
      buttons: [
        {
          text: 'Yes',
          handler: () => {
            var loader = this.loadingCtrl.create({ content: "Please wait..." });
            loader.present();
            this.app.getRootNav().setRoot(LandingPage);
            loader.dismiss(); 
          }
        }, {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });
    actionSheet.present();
  }
 
  next() {
    this.slides.slideNext();
  }

  prev() {
    this.slides.slidePrev();
  }
  goToHistory(){
    this.navCtrl.push(HistoryPage);
  }
  goToCategories(){
    this.navCtrl.push(CategoriesPage);
  }

}
