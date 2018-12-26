import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, Tabs, Config } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';
import { HomePage } from '../pages/home/home';
import { Keyboard } from '@ionic-native/keyboard';
import { TabsPage } from '../pages/tabs/tabs';
import { LandingPage } from '../pages/landing/landing';
import { Cordova } from '@ionic-native/core';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage: any;

  config = {
    apiKey: "AIzaSyA1yiQ3hn5sJjva5DPLzCNcD3JkGEyI9Dk",
    authDomain: "rich-out.firebaseapp.com",
    databaseURL: "https://rich-out.firebaseio.com",
    projectId: "rich-out",
    storageBucket: "rich-out.appspot.com",
    messagingSenderId: "550404557767"
  };
  constructor(public platform: Platform, public statusBar: StatusBar, splashScreen: SplashScreen, private Config: Config, private keyboard: Keyboard) {
    this.initializeApp();
    this.Config.set("scrollPadding", false);
    this.Config.set("scrollAssist", false);

    this.Config.set("autoFocusAssist", true);

    this.Config.set("android", "scrollAssist", true);

    this.Config.set("android", "autoFocusAssist", "delay");


  }



  initializeApp() {
    firebase.initializeApp(this.config);
    this.platform.ready().then(() => {
      // this.statusBar.overlaysWebView(false);
      this.statusBar.hide();
      const unsubscribe = firebase.auth().onAuthStateChanged(user => {
        console.log(user);
        if (!user) {
          this.rootPage = LandingPage;
          unsubscribe();
        } else {
          if (user.emailVerified) {
            this.rootPage = Tabs;
          } else {
            this.rootPage = LandingPage;
            // this.rootPage = LoginPage;
          }
          unsubscribe();
        }
      });

    });
  }
}
