import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, LoadingController, AlertController } from 'ionic-angular';
import { DbProvider } from '../../providers/db/db';
import { Base64 } from '@ionic-native/base64';
import { ApIserviceProvider } from '../../providers/ap-iservice/ap-iservice';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { ProfilePage } from '../profile/profile';


/**
 * Generated class for the EditProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-profile',
  templateUrl: 'edit-profile.html',
})
export class EditProfilePage {
  public profileForm: FormGroup
  fullName: any;
  phoneNumber: any;
  email: any;
  memberSince: any;
  data: any;
  constructor(public alertCtrl: AlertController, public loadingCtrl: LoadingController, public toastCtrl: ToastController, public db: DbProvider, private base64: Base64, formBuilder: FormBuilder, public apiService: ApIserviceProvider, public navCtrl: NavController, public navParams: NavParams) {
    this.profileForm = formBuilder.group({
      fullName: [''],
      phoneNumber: [''],
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      // password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad EditProfilePage');
  }

  ionViewWillLoad() {
    // let headers = new Headers();
    // headers.append("Content-Type", "application/json");
    // headers.set('Authorization', 'Basic ' + this.apiService.token);


    const userData = this.db.get("userInfo");
    this.fullName = userData["fullName"];
    this.phoneNumber = userData["phoneNumber"];
    this.email = userData["email"];

  }

  updateProfile() {
    const userData = this.db.get("userInfo");
    console.log(userData)

    let newProfile = {
      accountType: "donor",
      email: this.profileForm.value.email,
      fullName: this.profileForm.value.fullName,
      phoneNumber: this.profileForm.value.phoneNumber,
      uid: userData["uid"],
      dateCreated: userData["dateCreated"]
    }
    console.log(newProfile)

    const Alert = this.alertCtrl.create({
      message: 'Error',
      buttons: [
        { text: 'Cancel', role: 'cancel' },
        {
          text: 'Ok',
          role: 'cancel'
        }
      ]
    });
    var loader = this.loadingCtrl.create({ content: "Updating Profile..." });
    loader.present();

    let toast = this.toastCtrl.create({
      message: "Profile updated",
      duration: 2000,
      position: 'top'
    });
    const navCtrl =this.navCtrl

   this.db.set("userInfo", newProfile);

   this.apiService.fetch('users/update',newProfile)
      .then(function (response) {
        // Handle response we get from the API
        response.json().then(function (data) {
          console.log(data)
          // console.log(data.data);
          console.log(data.status)

          if (data.status == "success") {
            loader.dismiss();
            navCtrl.setRoot(ProfilePage);
            toast.present();
          } else {
            loader.dismiss();
            //  Tell user why they can't update profile
          }
        });

      }).catch(function (error) {
        console.log(error + 'My Error');
        Alert.present();
      });
  }


  async updatePassword(): Promise<void> {
    const alert = await this.alertCtrl.create({
      inputs: [
        { name: 'newPassword', placeholder: 'New password', type: 'password' },
        { name: 'oldPassword', placeholder: 'Old password', type: 'password' },
      ],
      buttons: [
        { text: 'Cancel' },
        {
          text: 'Save',
          handler: data => {
             if(data.newPassword.toString() >= 6 ||data.oldPassword.toString() >= 6 ){

             }else{
              let toast = this.toastCtrl.create({
                message: 'Password must 6 characters or more',
                duration: 2000,
                position: 'top'
              });

              toast.onDidDismiss(() => {
                console.log('Dismissed toast');
              });

              toast.present();

             }
          },
        },
      ],
    });
    await alert.present();
  }

}
