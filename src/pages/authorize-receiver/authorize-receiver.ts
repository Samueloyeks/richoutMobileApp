import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, ToastController } from 'ionic-angular';
import { ResetPasswordPage } from '../reset-password/reset-password';
import { FirebaseServiceProvider } from '../../providers/firebase-service/firebase-service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailValidator } from '../../validators/email';
import { MenuController } from 'ionic-angular';
import { HomePage } from '../home/home';
import { LandingPage } from '../landing/landing';
import { TabsPage } from '../tabs/tabs';
/**
 * Generated class for the AuthorizeReceiverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

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
  constructor(formBuilder: FormBuilder, public menuCtrl: MenuController, public firebaseService: FirebaseServiceProvider,
    public FirebaseService: FirebaseServiceProvider, public navCtrl: NavController,
    public navParams: NavParams, public loadingCtrl: LoadingController, public alertCtrl: AlertController,
    public toastCtrl: ToastController) {

    this.login = "Login";
    this.loginForm = formBuilder.group({
      email: ['', Validators.compose([Validators.required, EmailValidator.isValid])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6)])]
    });
    this.signupForm = formBuilder.group({
      firstName: [''],
      lastName: [''],
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
    // var that = this;

    // if (!this.loginForm.valid) {
    //   const Alert = this.alertCtrl.create({
    //     message: 'Please enter email and password',
    //     buttons: [
    //       { text: 'Ok', role: 'cancel' },
    //     ]
    //   });
    //   Alert.present();
    // } else {
    //   var loader = this.loadingCtrl.create({
    //     content: "Please Wait..."
    //   });
    //   loader.present();

    //   const email = this.loginForm.value.email;
    //   const password = this.loginForm.value.password;

    //   this.FirebaseService.loginUserService(email, password).then((authData: any) => {
    //     console.log(authData.user);
    //     if (authData.user.emailVerified) {
    //       loader.dismiss();
          this.navCtrl.setRoot(TabsPage);
    //     } else {
    //       loader.dismiss();
    //       that.navCtrl.setRoot(AuthorizeDonorPage);
    //       const Alert = this.alertCtrl.create({
    //         message: 'Please verify email first',
    //         buttons: [
    //           { text: 'Ok', role: 'cancel' },
    //         ]
    //       });
    //       Alert.present();
    //     }

    //   }, error => {
    //     loader.dismiss();
    //     let toast = this.toastCtrl.create({
    //       message: "Sorry You're not registered",
    //       duration: 3000,
    //       position: 'top'
    //     });
    //     toast.present();
    //   });
    // }
  }

  async signUp(): Promise<void> {
    var account = {
      firstName: this.signupForm.value.firstName,
      lastName: this.signupForm.value.lastName,
      email: this.signupForm.value.email,
      password: this.signupForm.value.password,
      accountType: "donor",

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
      this.FirebaseService.signupUserService(account).then(() => {
        loader.dismiss().then(() => {
          this.navCtrl.setRoot(HomePage);
        })
        const Alert = this.alertCtrl.create({
          message: 'A confirmation email has been sent to your email address',
          buttons: [
            { text: 'Cancel', role: 'cancel' },
            {
              text: 'Ok',
              role: 'cancel'
            }
          ]
        });
        Alert.present();
      }, error => {
        loader.dismiss();
        //unable to log in
        let toast = this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      });
    }


  }

  hideLogin() {
    this.hideLoginForm = true;
    this.hideSignupForm = false;
  }
  hideSignup() {
    this.hideLoginForm = false;
    this.hideSignupForm = true;
  }

  navigateToForgotPassword(){
    this.navCtrl.push(ResetPasswordPage);
  }
  goToLanding(){
    this.navCtrl.setRoot(LandingPage)
  }

}
