import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ActionSheetController, LoadingController } from 'ionic-angular';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { Base64 } from '@ionic-native/base64';
import { DbProvider } from '../../providers/db/db';
import { EditProfilePage } from '../edit-profile/edit-profile';
import { App } from 'ionic-angular/components/app/app';
import { LandingPage } from '../landing/landing';

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  uid: any;
  fullName: any;
  phoneNumber: any;
  email: any;
  accountType:any;
  memberSince: any;
  data: any;


  constructor(public db:DbProvider,private base64: Base64, public apiService: ApIserviceProvider,public loadingCtrl:LoadingController,
     public navCtrl: NavController, public navParams: NavParams,public actionSheetCtrl:ActionSheetController,public app: App) {
    this.uid = navParams.data
    console.log(this.uid);
    // this.data = this.getProfile();
    // console.log(this.data);

  }

  // ionViewWillLoad():void{
  //   this.getProfile().then((data)=>{
  //     console.log(data)
  //   })
  // }

  ionViewWillLoad(){
    const uid = this.uid;

    const userData= this.db.get("userInfo");
    this.fullName = userData["fullName"];
    this.phoneNumber = userData["phoneNumber"];
    this.email = userData["email"];
    this.accountType = userData["accountType"];
    this.memberSince = userData["dateCreated"];



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
  goToEditProfile(){
    this.navCtrl.push(EditProfilePage);
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



}
