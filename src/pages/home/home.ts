import { Component } from '@angular/core';
import { NavController, ActionSheetController, LoadingController, App } from 'ionic-angular';
import { AuthorizeDonorPage } from '../authorize-donor/authorize-donor';
import { Platform, Nav } from 'ionic-angular';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {

  constructor(public navCtrl: NavController,public actionSheetCtrl:ActionSheetController,
    public loadingCtrl:LoadingController, public app: App) {

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
            this.app.getRootNav().setRoot(AuthorizeDonorPage);
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
