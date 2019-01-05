import { Component } from '@angular/core';
import {
  Alert,
  AlertController,
  IonicPage,
  Loading,
  LoadingController,
  NavController,
  ToastController
} from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
// import { HomePage } from '../home/home';
import { EmailValidator } from '../../validators/email';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { Base64 } from '@ionic-native/base64';

@IonicPage()
@Component({
  selector: 'page-reset-password',
  templateUrl: 'reset-password.html',
  providers: [FirebaseServiceProvider]
})
export class ResetPasswordPage {
  public resetPasswordForm: FormGroup;

  constructor( 
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public alertCtrl: AlertController,
    public FirebaseService: FirebaseServiceProvider,
    formBuilder: FormBuilder,
    public apiService:ApIserviceProvider,
    private base64: Base64,
    public toastCtrl:ToastController,
  ) {
    this.resetPasswordForm = formBuilder.group({
      email: [
        '',
        Validators.compose([Validators.required, EmailValidator.isValid])
      ]
    });
  }

   resetPassword(){
    if (!this.resetPasswordForm.valid) {
      console.log(
        `Form is not valid yet, current value: ${this.resetPasswordForm.value}`
      );
    } else {
      const loading: Loading = this.loadingCtrl.create();
      loading.present();
      const alert: Alert = this.alertCtrl.create({
        message: 'Check your inbox for a password reset link',
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Ok',
            handler: data => {
              this.navCtrl.pop();
            }
          }
        ]
      });
      const errorAlert = this.alertCtrl.create({
        message: 'Error',
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });
     
     
      var authEmail ={
        email : this.resetPasswordForm.value.email
      }

     this.apiService.fetch('users/forgotPassword',authEmail)
      .then(function (response) {
        // Handle response we get from the API 
        response.json().then(function (data) {
          console.log(data)
          console.log(data.data);
          console.log(data.message)

          if (data.status == "success") {
            loading.dismiss();
            alert.present();

          } else {
            loading.dismiss();
            errorAlert.present();
          }
        });

      }).catch((error)=>{
        loading.dismiss();
        console.log(error + 'My Error');
     this.showToast(error);   
      });
    }
  }

  showToast(message){
    let toast=this.toastCtrl.create({
      message:message,
      duration:3000,
      position:'top'
    });
    toast.present();
  }
}

