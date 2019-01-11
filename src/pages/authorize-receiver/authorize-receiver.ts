import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController, ActionSheetController, ModalController, Modal, Loading } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import * as $ from "jquery"
import { TabsPage } from '../tabs/tabs';
import { LandingPage } from '../landing/landing';
import { SignupModalPage } from '../signup-modal/signup-modal';
import { Camera } from "@ionic-native/camera";
import { NativePageTransitions, NativeTransitionOptions } from '@ionic-native/native-page-transitions';
import { HTTP } from '@ionic-native/http';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { Base64 } from '@ionic-native/base64';
import { DbProvider } from '../../providers/db/db';

@IonicPage()
@Component({
  selector: 'page-authorize-receiver',
  templateUrl: 'authorize-receiver.html',
})
export class AuthorizeReceiverPage {
  public loginForm: FormGroup;
  public signupForm: FormGroup;
  passwordType: string = 'password';
  passwordShown: boolean = false;
  passwordType2: string = 'password';
  passwordShown2: boolean = false;
  login;
  hideSignupForm: boolean = true;
  hideLoginForm: boolean = false;
  public loading: Loading;
  selectedPhoto;
  public base64Image: string = null;
  profilePhotoUrl

  constructor(public db: DbProvider, private base64: Base64, public apiService: ApIserviceProvider, private http: HTTP, formBuilder: FormBuilder, public menuCtrl: MenuController, public firebaseService: FirebaseServiceProvider,
    public FirebaseService: FirebaseServiceProvider, public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public toastCtrl: ToastController, public actionSheetCtrl: ActionSheetController, public camera: Camera,
    public modal: ModalController, private nativePageTransitions: NativePageTransitions) {

    this.login = "Login";
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.signupForm = formBuilder.group({
      fullName: [''],
      phone: [''],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])],
    });

  }

  public togglePassword() {
    if (this.passwordShown) {
      this.passwordShown = false;
      this.passwordType = 'password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'string';
    }
  }
  public togglePassword2() {
    if (this.passwordShown2) {
      this.passwordShown2 = false;
      this.passwordType2 = 'password';
    } else {
      this.passwordShown2 = true;
      this.passwordType2 = 'string';
    }
  }
  async logIn(): Promise<void> {
    var userAuthDetails = {
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    };

    if (!this.loginForm.valid) {
      const Alert = this.alertCtrl.create({
        message: 'Please enter email and password',
        buttons: [
          { text: 'Ok', role: 'cancel' },
        ]
      });
      Alert.present();
    } else {
      var loader = this.loadingCtrl.create({
        content: "Please Wait..."
      });
      loader.present();


      const notReceiver = this.alertCtrl.create({
        message: 'This account is not a receiver account',
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });
      const notVerified = this.alertCtrl.create({
        message: 'Please verify email first',
        buttons: [
          { text: 'Ok', role: 'cancel' },
        ]
      });
      let toast = this.toastCtrl.create({
        message: "The password is invalid or the user does not have a password",
        duration: 3000,
        position: 'top'
      });
      const navCtrl = this.navCtrl;

      var db = this.db;
      var self = this;
      this.apiService.fetch('users/login', userAuthDetails)
        .then(function (response) {
          // Handle response we get from the API
          response.json().then(function (data) {
            console.log(data)
            console.log(data.data);
            console.log(data.message)
            // console.log(data.data["fullName"])

            if (data.status == "success") {
              if (data.data["accountType"] == "receiver") {
                db.set("userInfo", data.data);
                loader.dismiss();
                navCtrl.setRoot(TabsPage, { uid: data.data["uid"] });
              } else {
                notReceiver.present();
                loader.dismiss();
              }

            } else {
              if (data.data["verified"] == false) {
                notVerified.present();
                loader.dismiss();
              } else {
                self.apiService.showApiResponseAlert(data.message);
                loader.dismiss();
              }

            }
          });

        }).catch(function (error) {
          this.showAlert('An error occured while performing request.Please try again');
          loader.dismiss();
        });
    }
  }
  async signUp(): Promise<void> {
    var account = {
      fullName: this.signupForm.value.fullName,
      phoneNumber: this.signupForm.value.phone,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      accountType: "receiver",
      profilePhotoUrl:null
    };

    console.log(account);
    if (!this.signupForm.valid) {
      const Alert = this.alertCtrl.create({
        message: 'Please complete form',
        buttons: [
          { text: 'Ok', role: 'cancel' },
        ]
      });
      Alert.present();
      console.log(`Form is not valid yet, current value: ${this.signupForm.value}`);
    } else {
      var loader = this.loadingCtrl.create({ content: "Please wait..." });
      loader.present();
      const signupModal: Modal = this.modal.create(SignupModalPage, {}, { showBackdrop: true, enableBackdropDismiss: true });

      const navCtrl = this.navCtrl;
      var emailTaken = this.alertCtrl.create({
        message: 'The email address is already in use by another account',
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      })
      var db = this.db;
      var self = this;

      if(this.base64Image){
        this.apiService.fetch('services/upload', { "image": this.base64Image })
        .then(function (response) {
          response.json().then(function (data) {
            console.log(data);
            let photo = { "photoUrl":data.data["url"]}
            console.log(photo)

            if (data.status == "success") {
              console.log('Url to be attached to registration: '+data.data["url"])
              account.profilePhotoUrl = data.data["url"];
              self.apiService.fetch('users/register', account)
              .then(function (response) {
                // Handle response we get from the API
                response.json().then(function (data) {
                  console.log(data)
                  console.log(data.data);
                  console.log(data.message)
                  console.log(data.data["fullName"])
        
                  if (data.status == "success") {
                    db.set("userInfo", data.data);
                    loader.dismiss();
                    signupModal.onWillDismiss(() => {
                      navCtrl.setRoot(TabsPage, { uid: data.data["uid"] });
                    });
                    signupModal.present();
                  } else {
                    self.apiService.showApiResponseAlert(data.message);
                    loader.dismiss();
                  }
                });
        
              }).catch((error) => {
                this.showAlert('An error occured while performing request.Please try again');
                loader.dismiss();
              });
              loader.dismiss();
            } else {
              self.apiService.showApiResponseAlert(data.message);
              loader.dismiss();
            }
          });
        }).catch((error) => {
          this.showAlert('An error occured while performing request.Please try again');
          // alert(error);
          loader.dismiss();
        });
      }else{

      this.apiService.fetch('users/register', account)
      .then(function (response) {
        // Handle response we get from the API
        response.json().then(function (data) {
          console.log(data) 
          console.log(data.data);
          console.log(data.message)
          console.log(data.data["fullName"])

          if (data.status == "success") {
            db.set("userInfo", data.data);
            loader.dismiss();
            signupModal.onWillDismiss(() => {
              navCtrl.setRoot(TabsPage, { uid: data.data["uid"] });
            });
            signupModal.present();
          } else {
            self.apiService.showApiResponseAlert(data.message);
            loader.dismiss();
          }
        });

      }).catch((error) => {
        this.showAlert('An error occured while performing request.Please try again');
        loader.dismiss();
      });

      }
    }
  }
  showAlert(msg) {
    var customAlert = this.alertCtrl.create({
      message: msg,
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    customAlert.present();
  }

  hideLogin() {
    this.hideLoginForm = true;
    this.hideSignupForm = false;
  }
  hideSignup() {
    this.hideLoginForm = false;
    this.hideSignupForm = true;
  }

  navigateToForgotPassword() {
    this.navCtrl.push(ResetPasswordPage);
  }
  // goToLanding() {
  //   this.nativePageTransitions.fade(null);
  //   this.navCtrl.setRoot(LandingPage)
  // }
  goBack() {
    this.navCtrl.pop();
  }


  async uploadpic() {
    let actionSheet = this.actionSheetCtrl.create({
      title: "Select Image Source",
      buttons: [
        {
          text: "Select from Library",
          handler: () => {
            return this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
          }
        },
        {
          text: "Use Camera",
          handler: () => {
            return this.takePicture(this.camera.PictureSourceType.CAMERA);
          }
        },
        {
          text: "Cancel",
          role: "cancel"
        }
      ]
    });
    actionSheet.present();
  }

  public takePicture(sourceType) {
    var options = {
      quality: 100,
      targetHeight: 200,
      targetWidth: 200,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: sourceType,
      correctOrientation: true,
      allowEdit: true,
      saveToPhotoAlbum: false
    }

    this.camera.getPicture(options).then((imageData) => {
      var loading = this.loadingCtrl.create({
        content: 'Please wait...'
      });
      loading.present().then(() => {
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
        console.log(JSON.stringify({ "image": this.base64Image }))

        var db = this.db;
        var self = this;
        // this.apiService.fetch('services/upload', { "image": this.base64Image })
        //   .then(function (response) {
        //     response.json().then(function (data) {
        //       console.log(data);
        //       let photo = { "photoUrl":data.data["url"]}
        //       console.log(photo)

        //       if (data.status == "success") {
        //         // db.set("photo", photo);
        //         // db.set("userInfo.profilePhotoUrl",data.data["url"])
        //         loading.dismiss();
        //         console.log(data.data["url"])
        //         return data.data["url"];
                
        //         // return photo;

        //       } else {
        //         self.apiService.showApiResponseAlert(data.message);
        //         loading.dismiss();
        //       }
        //     });
        //   }).catch((error) => {
        //     this.showAlert('An error occured while performing request.Please try again');
        //     // alert(error);
        //     loading.dismiss();
        //   });
        loading.dismiss();
      })
    }, (err) => {
      console.log('error', err);
      const alert = this.alertCtrl.create({
        message: err,
        buttons: [
          { text: 'Cancel', role: 'cancel' },
          {
            text: 'Ok',
            role: 'cancel'
          }
        ]
      });
      alert.present();
    });
  }

}
