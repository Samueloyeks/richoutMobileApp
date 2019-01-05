import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { HTTP } from '@ionic-native/http';
import { Base64 } from '@ionic-native/base64';
import { DbProvider } from '../db/db';
import { MenuController, NavController, LoadingController, AlertController, ModalController, ToastController, ActionSheetController } from 'ionic-angular';
import { FirebaseServiceProvider } from '../firebase-service/firebase-service';
import { Camera } from '@ionic-native/camera';
import { NativePageTransitions } from '@ionic-native/native-page-transitions';
import { NavParams } from 'ionic-angular/navigation/nav-params';
import { TabsPage } from '../../pages/tabs/tabs';


@Injectable()
export class ApIserviceProvider {
  // baseURL:string = 'http://localhost:3000/';
  baseURL:string = 'http://35.231.25.130:3000/';
  apiUsername = "am9objpzbWl0aA==";
  apiPassword = "JiZAQEFBMTE6NjcmOCMh";
  token = btoa(this.apiUsername + ":" + this.apiPassword);
  constructor()  {

  }


  

fetch(targetFunction,data):Promise<any>{
  let headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.set('Authorization', 'Basic ' + this.token);

    const url = this.baseURL + targetFunction;

  var request = new Request(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: headers
  });

  return fetch(request);
}


}
